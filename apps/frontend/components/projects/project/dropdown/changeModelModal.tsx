"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

import { useProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";

const modelSchema = z.object({
  model: z.string().min(1, "مدل را انتخاب کنید"),
});

type ModelFormType = z.infer<typeof modelSchema>;

interface ChangeModelModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangeModelModal = ({
  isOpen,
  onOpenChange,
}: ChangeModelModalProps) => {
  const { updateProject, currentProject } = useProject();
  const { getAllUsers, users } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModelFormType>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      model: "",
    },
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const onSubmit = async (data: ModelFormType) => {
    if (!currentProject?._id) return;

    await updateProject(currentProject._id, { model: data.model });
    reset();
    onOpenChange(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>تغییر مدل پروژه</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="model"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="انتخاب مدل جدید"
                      radius="lg"
                      variant="faded"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!errors.model}
                      errorMessage={errors.model?.message}
                    >
                      {users.map((user) => (
                        <SelectItem key={user._id}>{user.fullName}</SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Button
                  type="submit"
                  color="primary"
                  radius="lg"
                  fullWidth
                  className="bg-Porcelain_White text-Jet_Black"
                >
                  ذخیره مدل
                </Button>
              </form>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

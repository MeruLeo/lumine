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

import { useProject } from "@/hooks/useProject";

const statusSchema = z.object({
  status: z.string().min(1, "وضعیت را انتخاب کنید"),
});

type StatusFormType = z.infer<typeof statusSchema>;

interface ChangeStatusModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangeStatusModal = ({
  isOpen,
  onOpenChange,
}: ChangeStatusModalProps) => {
  const { updateProject, currentProject } = useProject();

  const { control, handleSubmit, formState, reset } = useForm<StatusFormType>({
    resolver: zodResolver(statusSchema),
    defaultValues: { status: "" },
  });

  const onSubmit = async (data: StatusFormType) => {
    if (!currentProject?._id) return;

    await updateProject(currentProject._id, { status: data.status });
    reset();
    onOpenChange(false);
  };

  const statusOptions = [
    { key: "pending", label: "در انتظار" },
    { key: "in_progress", label: "در حال انجام" },
    { key: "completed", label: "تکمیل شده" },
    { key: "cancelled", label: "لغو شده" },
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-base">تغییر وضعیت پروژه</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="وضعیت"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!formState.errors.status}
                      errorMessage={formState.errors.status?.message}
                      radius="lg"
                      variant="faded"
                    >
                      {statusOptions.map((s) => (
                        <SelectItem key={s.key}>{s.label}</SelectItem>
                      ))}
                    </Select>
                  )}
                />

                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  radius="lg"
                  className="bg-Porcelain_White text-Jet_Black"
                >
                  ذخیره وضعیت
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

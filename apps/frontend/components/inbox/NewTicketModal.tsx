"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Form,
} from "@heroui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useTicketStore } from "@/stores/ticket.store";

const ticketSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  message: z.string().min(1, "متن تیکت الزامی است"),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  projectId: z.union([z.string().min(1), z.literal("")]).optional(),
});

type TicketFormType = z.infer<typeof ticketSchema>;

interface NewTicketModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  reporterId: string;
  projects: { _id: string; name: string }[];
}

export default function NewTicketModal({
  isOpen,
  onOpenChange,
  reporterId,
  projects,
}: NewTicketModalProps) {
  const { createTicket } = useTicketStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TicketFormType>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      message: "",
      priority: "medium",
      category: "",
      projectId: "",
    },
  });

  const onSubmit = async (data: TicketFormType) => {
    const payload = {
      ...data,
      reporterId,
    };

    if (!data.projectId) {
      delete payload.projectId;
    }

    try {
      await createTicket(payload);
      reset();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">تیکت جدید</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("title")}
                label="عنوان"
                size="sm"
                radius="lg"
                variant="faded"
                isInvalid={!!errors.title}
                errorMessage={errors.title?.message}
              />

              <Textarea
                {...register("message")}
                label="متن تیکت"
                size="sm"
                radius="lg"
                variant="faded"
                isInvalid={!!errors.message}
                errorMessage={errors.message?.message}
              />

              <div className="flex w-full gap-1">
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="اولویت"
                      radius="lg"
                      variant="faded"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!errors.priority}
                      errorMessage={errors.priority?.message}
                    >
                      <SelectItem key="low">کم</SelectItem>
                      <SelectItem key="medium">متوسط</SelectItem>
                      <SelectItem key="high">زیاد</SelectItem>
                      <SelectItem key="urgent">فوری</SelectItem>
                    </Select>
                  )}
                />

                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="دسته‌بندی"
                      radius="lg"
                      variant="faded"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!errors.category}
                      errorMessage={errors.category?.message}
                    >
                      <SelectItem key="financial">مالی</SelectItem>
                      <SelectItem key="work">کاری</SelectItem>
                      <SelectItem key="teach">آموزشی</SelectItem>
                      <SelectItem key="other">متفرقه</SelectItem>
                    </Select>
                  )}
                />
              </div>

              <Controller
                name="projectId"
                control={control}
                render={({ field }) => (
                  <Select
                    label="پروژه"
                    radius="lg"
                    variant="faded"
                    selectedKeys={[field.value]}
                    onSelectionChange={(keys) =>
                      field.onChange(Array.from(keys)[0])
                    }
                    isInvalid={!!errors.projectId}
                    errorMessage={errors.projectId?.message}
                  >
                    {/* <SelectItem key="">بدون پروژه</SelectItem> */}
                    {projects.map((p) => (
                      <SelectItem key={p._id}>{p.name}</SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Button
                type="submit"
                radius="lg"
                fullWidth
                className="bg-Porcelain_White text-Jet_Black mt-4"
              >
                ایجاد تیکت
              </Button>
            </Form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}

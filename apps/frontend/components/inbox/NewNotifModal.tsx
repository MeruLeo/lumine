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
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { useNotificationStore } from "@/stores/notification.store";

const notifSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  message: z.string().min(1, "متن نوتیفیکیشن الزامی است"),
  type: z.enum(["personal", "global"], {
    required_error: "نوع نوتیفیکیشن را انتخاب کنید",
  }),
  status: z.enum(["info", "success", "warning", "error"]),
  recipientIds: z.array(z.string()).optional(),
});

type NotificationFormType = z.infer<typeof notifSchema>;

interface NewNotificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewNotificationModal({
  isOpen,
  onOpenChange,
}: NewNotificationModalProps) {
  const { getAllUsers, users } = useUser();
  const { createNotification } = useNotificationStore();
  const [showRecipients, setShowRecipients] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<NotificationFormType>({
    resolver: zodResolver(notifSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "personal",
      status: "info",
      recipientIds: [],
    },
  });

  const type = watch("type");

  useEffect(() => {
    setShowRecipients(type === "personal");
  }, [type]);

  const onSubmit = async (data: NotificationFormType) => {
    try {
      await createNotification({
        title: data.title,
        message: data.message,
        type: data.type,
        status: data.status,
        recipientIds: data.type === "personal" ? data.recipientIds : [],
      });

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
          <ModalHeader className="flex flex-col gap-1">
            نوتیفیکیشن جدید
          </ModalHeader>
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
                label="متن نوتیفیکیشن"
                size="sm"
                radius="lg"
                variant="faded"
                isInvalid={!!errors.message}
                errorMessage={errors.message?.message}
              />

              <div className="flex gap-1 w-full">
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="نوع نوتیفیکیشن"
                      radius="lg"
                      variant="faded"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!errors.type}
                      errorMessage={errors.type?.message}
                    >
                      <SelectItem key="personal">شخصی</SelectItem>
                      <SelectItem key="global">عمومی</SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="وضعیت"
                      radius="lg"
                      variant="faded"
                      selectedKeys={[field.value]}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys)[0])
                      }
                      isInvalid={!!errors.status}
                      errorMessage={errors.status?.message}
                    >
                      <SelectItem key="info">اطلاعی</SelectItem>
                      <SelectItem key="success">موفق</SelectItem>
                      <SelectItem key="warning">هشدار</SelectItem>
                      <SelectItem key="error">خطا</SelectItem>
                    </Select>
                  )}
                />
              </div>

              {showRecipients && (
                <Controller
                  name="recipientIds"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="گیرندگان"
                      variant="faded"
                      selectionMode="multiple"
                      radius="lg"
                      selectedKeys={field.value || []}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys))
                      }
                      isInvalid={!!errors.recipientIds}
                      errorMessage={errors.recipientIds?.message}
                    >
                      {users.map((user) => (
                        <SelectItem key={user._id}>{user.fullName}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              )}

              <Button
                type="submit"
                radius="lg"
                fullWidth
                className="bg-Porcelain_White text-Jet_Black mt-4"
              >
                ارسال نوتیفیکیشن
              </Button>
            </Form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}

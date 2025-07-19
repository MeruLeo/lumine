"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useNotification } from "@/hooks/useNotif";
import { useRouter } from "next/navigation";

interface DeleteNotifModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedNotification: { _id: string; [key: string]: any } | null;
}

export default function DeleteNotifModal({
  isOpen,
  onOpenChange,
  selectedNotification,
}: DeleteNotifModalProps) {
  const { deleteNotification } = useNotification();
  const router = useRouter();

  const handleDelete = async () => {
    console.log(selectedNotification);
    if (!selectedNotification) return;
    try {
      await deleteNotification(selectedNotification._id);
      onOpenChange(false);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>حذف اعلان</ModalHeader>
            <ModalBody>
              <p className="text-sm text-danger font-medium">
                آیا مطمئن هستید که می‌خواهید این اعلان را حذف کنید؟ این عملیات
                قابل بازگشت نیست.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                radius="lg"
                onPress={() => {
                  onClose();
                }}
              >
                لغو
              </Button>
              <Button radius="lg" color="danger" onPress={handleDelete}>
                بله، حذف شود
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

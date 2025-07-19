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
import { useUser } from "@/hooks/useUser";

interface DeleteUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: { _id: string; [key: string]: any } | null;
}

export default function DeleteUserModal({
  isOpen,
  onOpenChange,
  selectedUser,
}: DeleteUserModalProps) {
  const { deleteUserById } = useUser();
  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUserById(selectedUser._id);
      onOpenChange(false);
      // اگر نیاز به رفرش لیست کاربران یا ریدایرکت بود، اینجا اضافه شود
      // router.refresh();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>حذف کاربر</ModalHeader>
            <ModalBody>
              <p className="text-sm text-danger font-medium">
                آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟ این عملیات
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

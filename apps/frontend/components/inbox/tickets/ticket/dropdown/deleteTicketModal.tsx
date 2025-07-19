"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";
import { useProject } from "@/hooks/useProject";
import { useRouter } from "next/navigation";
import { useTicket } from "@/hooks/useTiecket";
import PersianNumber from "@/utils/convertToPersianNumber";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteTicketModal({
  isOpen,
  onOpenChange,
}: DeleteProjectModalProps) {
  const { selectedTicket, deleteTicket } = useTicket();
  const [confirmation, setConfirmation] = useState("");

  const router = useRouter();

  const handleDelete = async () => {
    if (!selectedTicket) return;

    try {
      await deleteTicket(selectedTicket._id);
      setConfirmation("");
      onOpenChange(false);
      router.back();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const isMatch =
    confirmation.trim() === selectedTicket?.number.toString().trim();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>حذف تیکت</ModalHeader>
            <ModalBody>
              <p className="text-sm text-danger font-medium">
                آیا مطمئن هستید که می‌خواهید تیکت
                <span className="font-bold">
                  <PersianNumber number={`${selectedTicket?.number}`} />
                </span>{" "}
                را حذف کنید؟ این عملیات قابل بازگشت نیست.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                لطفاً برای تأیید حذف، شماره تیکت را دقیق وارد کنید.
              </p>
              <Input
                radius="lg"
                variant="faded"
                placeholder="شماره تیکت را وارد کنید"
                value={confirmation}
                type="number"
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                radius="lg"
                onPress={() => {
                  setConfirmation("");
                  onClose();
                }}
              >
                لغو
              </Button>
              <Button
                radius="lg"
                color="danger"
                isDisabled={!isMatch}
                onPress={handleDelete}
              >
                حذف تیکت
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

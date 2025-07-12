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

interface DeleteProjectModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteProjectModal({
  isOpen,
  onOpenChange,
}: DeleteProjectModalProps) {
  const { currentProject, deleteProject } = useProject();
  const [confirmation, setConfirmation] = useState("");

  const router = useRouter();

  const handleDelete = async () => {
    if (!currentProject) return;

    try {
      await deleteProject(currentProject._id);
      setConfirmation("");
      onOpenChange(false);
      router.back();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const isMatch = confirmation.trim() === currentProject?.name?.trim();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>حذف پروژه</ModalHeader>
            <ModalBody>
              <p className="text-sm text-danger font-medium">
                آیا مطمئن هستید که می‌خواهید پروژه "
                <span className="font-bold">{currentProject?.name}</span>" را
                حذف کنید؟ این عملیات قابل بازگشت نیست.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                لطفاً برای تأیید حذف، نام پروژه را دقیق وارد کنید.
              </p>
              <Input
                radius="lg"
                variant="faded"
                placeholder="نام پروژه را وارد کنید"
                value={confirmation}
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
                حذف پروژه
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

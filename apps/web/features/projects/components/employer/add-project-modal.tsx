"use client";

import { Modal, Button } from "@heroui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { CreateProjectForm } from "./add-project-form";

interface CreateProjectModalProps {
  triggerLabel?: string;
}

export const CreateProjectModal = ({
  triggerLabel = "ایجاد پروژه جدید",
}: CreateProjectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    console.log("Modal open state:", open);
    setIsOpen(open);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
      <Button
        type="button"
        onPress={() => {
          console.log("Modal trigger pressed");
        }}
      >
        <PlusIcon className="size-5" />
        {triggerLabel}
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="top">
          <Modal.Dialog className="">
            <Modal.CloseTrigger className="absolute left-3 right-auto top-3" />

            <Modal.Header>
              <Modal.Heading>ایجاد پروژه جدید</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <CreateProjectForm
                onSuccess={() => {
                  console.log("Project created successfully");
                  setIsOpen(false);
                }}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

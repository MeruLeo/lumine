"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@heroui/react";
import { SignalIcon, TrashIcon } from "@heroicons/react/20/solid";

import { EllipsIcon } from "@/components/icons/icons";
import { IProjectDropdown } from "@/types/projects";
import { useState } from "react";
import { useTicket } from "@/hooks/useTiecket";
import { ChangeStatusModal } from "./dropdown/changeStatusModal";
import DeleteTicketModal from "./dropdown/deleteTicketModal";

export type Role = "model" | "admin" | "developer";

export const TicketDropdown = ({ role }: { role: Role }) => {
  const { selectedTicket } = useTicket();

  const [activeModal, setActiveModal] = useState<
    null | "status" | "model" | "edit" | "delete"
  >(null);

  const adminItems: IProjectDropdown[] = [
    {
      key: "change-status",
      label: "تغییر وضعیت",
      icon: <SignalIcon className="size-6" />,
    },
    {
      key: "delete",
      label: "حذف تیکت",
      icon: <TrashIcon className="size-6" />,
      className: "text-danger",
      color: "danger" as const,
    },
  ];

  const handleAction = async (key: string) => {
    if (!selectedTicket) return;

    switch (key) {
      case "change-status":
        setActiveModal("status");
        break;
      case "delete":
        setActiveModal("delete");
        break;
    }
  };

  return (
    <>
      {role === "admin" ? (
        <Dropdown backdrop="blur" radius="lg">
          <DropdownTrigger>
            <Button
              isIconOnly
              className="bg-Jet_Black_4"
              radius="full"
              size="lg"
            >
              <EllipsIcon />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Project Actions"
            variant="faded"
            onAction={(key) => handleAction(key as string)}
          >
            {adminItems.map((item) => (
              <DropdownItem
                key={item.key}
                className={item.className}
                color={item.color}
                startContent={item.icon}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div />
      )}
      <ChangeStatusModal
        isOpen={activeModal === "status"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
      <DeleteTicketModal
        isOpen={activeModal === "delete"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </>
  );
};

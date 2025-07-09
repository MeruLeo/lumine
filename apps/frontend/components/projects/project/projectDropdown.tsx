"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@heroui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  PencilIcon,
  SignalIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

import { EllipsIcon } from "@/components/icons/icons";
import { IProjectDropdown } from "@/types/projects";
import { useProject } from "@/hooks/useProject";
import { useState } from "react";
import { ChangeStatusModal } from "./changeStatusModal";

export type Role = "model" | "admin" | "developer";

export const ProjectDropdown = ({ role }: { role: Role }) => {
  const [activeModal, setActiveModal] = useState<
    null | "status" | "model" | "edit" | "delete"
  >(null);

  const { updateProject, currentProject } = useProject();

  const adminItems: IProjectDropdown[] = [
    {
      key: "change-status",
      label: "تغییر وضعیت",
      icon: <SignalIcon className="size-6" />,
    },
    {
      key: "change-model",
      label: "تغییر مدل",
      icon: <UserCircleIcon className="size-6" />,
    },
    {
      key: "edit",
      label: "ویرایش مشخصات",
      icon: <PencilIcon className="size-6" />,
    },
    {
      key: "delete",
      label: "حذف پروژه",
      icon: <TrashIcon className="size-6" />,
      className: "text-danger",
      color: "danger" as const,
    },
  ];

  const userItems: IProjectDropdown[] = [
    {
      key: "request-edit",
      label: "درخواست ویرایش",
      icon: <PencilIcon className="size-6" />,
    },
    {
      key: "view-status",
      label: "درخواست خروج از پروژه",
      icon: <ArrowLeftStartOnRectangleIcon className="size-6" />,
    },
  ];

  const items = role === "admin" ? adminItems : userItems;

  const handleAction = async (key: string) => {
    if (!currentProject) return;

    switch (key) {
      case "change-status":
        setActiveModal("status");
        break;
      case "change-model":
        break;
      case "edit":
        break;
      case "delete":
        break;
      case "request-edit":
        break;
      case "view-status":
        break;
    }
  };

  return (
    <>
      <Dropdown backdrop="blur" radius="lg">
        <DropdownTrigger>
          <Button isIconOnly className="bg-Jet_Black_4" radius="full" size="lg">
            <EllipsIcon />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Project Actions"
          variant="faded"
          onAction={(key) => handleAction(key as string)}
        >
          {items.map((item) => (
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
      <ChangeStatusModal
        isOpen={activeModal === "status"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </>
  );
};

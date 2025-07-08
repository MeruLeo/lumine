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

export type Role = "model" | "admin" | "developer";

export const ProjectDropdown = ({ role }: { role: Role }) => {
  const adminItems = [
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

  const userItems = [
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

  return (
    <Dropdown radius="lg" backdrop="blur">
      <DropdownTrigger>
        <Button isIconOnly radius="full" size="lg" className="bg-Jet_Black_4">
          <EllipsIcon />
        </Button>
      </DropdownTrigger>

      <DropdownMenu variant="faded" aria-label="Project Actions">
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            startContent={item.icon}
            className={item.className}
            color={item.color}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

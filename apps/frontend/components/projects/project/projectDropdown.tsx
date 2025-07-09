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
import {
  changeModel,
  changeStatus,
  deleteProject,
  editProject,
  reqToEditProject,
  reqToOutFromProject,
} from "@/funcs/projects/project/dropdownActions";

export type Role = "model" | "admin" | "developer";

export const ProjectDropdown = ({ role }: { role: Role }) => {
  const adminItems: IProjectDropdown[] = [
    {
      key: "change-status",
      label: "تغییر وضعیت",
      icon: <SignalIcon className="size-6" />,
      action: changeStatus,
    },
    {
      key: "change-model",
      label: "تغییر مدل",
      icon: <UserCircleIcon className="size-6" />,
      action: changeModel,
    },
    {
      key: "edit",
      label: "ویرایش مشخصات",
      icon: <PencilIcon className="size-6" />,
      action: editProject,
    },
    {
      key: "delete",
      label: "حذف پروژه",
      icon: <TrashIcon className="size-6" />,
      action: deleteProject,
      className: "text-danger",
      color: "danger" as const,
    },
  ];

  const userItems: IProjectDropdown[] = [
    {
      key: "request-edit",
      label: "درخواست ویرایش",
      icon: <PencilIcon className="size-6" />,
      action: reqToEditProject,
    },
    {
      key: "view-status",
      label: "درخواست خروج از پروژه",
      icon: <ArrowLeftStartOnRectangleIcon className="size-6" />,
      action: reqToOutFromProject,
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
            className={item.className}
            color={item.color}
            startContent={item.icon}
            onPress={item.action}
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

import { BackIcon } from "@/components/icons/icons";

import { ProjectDropdown } from "./projectDropdown";
import { UserType } from "@/types/users";

interface ProjectHeaderProps {
  name: string;
  role: "model" | "admin" | "developer";
}

export const ProjectHeader = ({ name, role }: ProjectHeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex gap-2 p-2 justify-center w-full rounded-full items-center">
      <Button
        isIconOnly
        onPress={() => router.back()}
        className="bg-Jet_Black_4"
        radius="full"
        size="lg"
      >
        <BackIcon />
      </Button>

      <div className="w-[15rem] bg-Jet_Black_4 p-3 text-center text-3xl font-bold rounded-full">
        {name}
      </div>

      <ProjectDropdown role={role} />
    </header>
  );
};

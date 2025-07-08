"use client";
import { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";

import { useAuth } from "@/hooks/useAuth";
import { SearchIcon } from "@/components/icons";
import { useProject } from "@/hooks/useProject";
import {
  AllProjectsIcon,
  CheckIcon,
  ClockOrgIcon,
  PlusIcon,
  XIcon,
} from "@/components/icons/icons";
import { ProjectsSecs } from "@/components/projects/projectsSec";
import { IProjectsSec } from "@/types/projects";
import NewProjectModal from "@/components/projects/NewProjectModal";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showBtn, setShowBtn] = useState<boolean>();

  const { setSearchTerm } = useProject();
  const { getMe, user } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "model") setShowBtn(false);
    else setShowBtn(true);
  }, [user]);

  const projectsSecArray: IProjectsSec[] = [
    {
      name: "همه",
      icon: <AllProjectsIcon />,
      link: "/projects",
      color: "from-blue-800",
      secondColor: "to-green-400",
      count: 0,
    },
    {
      name: "درحال انجام",
      icon: <ClockOrgIcon />,
      link: "/projects/in_progress",
      color: "from-red-800",
      secondColor: "to-blue-300",
      count: 0,
    },
    {
      name: "به اتمام رسیده ها",
      icon: <CheckIcon />,
      link: "/projects/completed",
      color: "from-green-700",
      count: 0,
      secondColor: "to-yellow-400",
    },
    {
      name: "کنسل شده ها",
      icon: <XIcon />,
      link: "/projects/cancelled",
      color: "from-red-800",
      secondColor: "to-red-300",
      count: 0,
    },
  ];

  return (
    <section className="w-full load-page p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">پروژه ها</h1>
        <Button
          radius="full"
          className={`bg-Slate_Blue ${showBtn ? "flex" : "hidden"}`}
          startContent={<PlusIcon />}
          size="lg"
          onPress={() => setIsOpen(true)}
        >
          پروژه جدید
        </Button>
        <NewProjectModal isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
      <div className="w-full mt-8 gap-4 flex flex-col">
        <header className="w-full">
          <ProjectsSecs projectsSecs={projectsSecArray} />
        </header>
        <Input
          className="w-fit"
          radius="full"
          placeholder="جستجو بر اساس نام پروژه"
          startContent={<SearchIcon />}
          size="lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {children}
      </div>
    </section>
  );
}

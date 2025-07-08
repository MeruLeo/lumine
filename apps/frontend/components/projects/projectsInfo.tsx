"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import type { ProjectInfoProps } from "@/types/projects";

import { getCategoryLabel } from "@/utils/categoryLabel";
import { ProjectInfo } from "./project/projectInfo";

import PersianDate from "@/components/persianDate";
import { useProject } from "@/hooks/useProject";
import { formatBudget } from "@/utils/formatBudget";

import {
  EndDateIcon,
  InboxsIcon,
  MonyIcon,
  StartDateIcon,
  StatusIcon,
  UserIcon,
} from "@/components/icons/icons";

export const ProjectsInfo = () => {
  const pathname = usePathname();
  const { fetchById, currentProject } = useProject();
  const extractId = pathname.slice(10);

  useEffect(() => {
    fetchById(extractId);
  }, []);

  if (!currentProject) return null;

  const projectInfoArray: ProjectInfoProps[] = [
    {
      icon: <StatusIcon />,
      title: "وضعیت",
      value: currentProject.status,
    },
    {
      icon: <UserIcon />,
      title: "مدل",
      value: currentProject.model?.fullName || "نامشخص",
    },
    {
      icon: <InboxsIcon />,
      title: "دسته بندی",
      value: getCategoryLabel(`${currentProject.category}`),
    },
    {
      icon: <MonyIcon />,
      title: "بودجه",
      value: formatBudget(currentProject.budget),
    },
    {
      icon: <StartDateIcon />,
      title: "تاریخ شروع",
      value: <PersianDate createdAt={currentProject.startDate} />,
    },
    {
      icon: <EndDateIcon />,
      title: "تاریخ پایان",
      value: <PersianDate createdAt={currentProject.endDate} />,
    },
  ];

  return (
    <ul className="flex load-page bg-Jet_Black_4 p-4 rounded-[2.5rem] justify-center gradient-border_bottom items-center w-1/2 flex-col gap-1">
      {projectInfoArray.map((pi, i) => (
        <ProjectInfo key={i} {...pi} />
      ))}
    </ul>
  );
};

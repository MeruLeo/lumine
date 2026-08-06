import Link from "next/link";
import type { Project } from "../types/project";
import { ProjectStatusBadge } from "./project-status-badge";
import { formatBudget } from "../utils/format";
import { Calendar, MapPin, Tag } from "@gravity-ui/icons";
import { Avatar } from "@heroui/react";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`مشاهده جزئیات پروژه ${project.name}`}
      className="group flex h-[250px] flex-col gap-4 rounded-4xl bg-card p-4 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
          <Tag className="h-3.5 w-3.5" />
          {project.category.persion_name}
        </span>
        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="line-clamp-1 text-base font-semibold  transition">
          {project.name}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-text-placeholder-light dark:text-text-placeholder-dark">
          {project.description}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2.5 text-sm text-text-placeholder-light dark:text-text-placeholder-dark">
        <div className="flex items-center gap-2">
          <span className="font-medium">{formatBudget(project.budget)}</span>
          <span className="text-zinc-400">تومان</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {project.province.name}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {project.startDate}
          </span>
          تا
          <span className="flex items-center gap-1.5">{project.endDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border pt-3">
        <span className="text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
          {project.employer.fullName}
        </span>
      </div>
    </Link>
  );
};

import { Tray } from "@gravity-ui/icons";
import type { Project } from "../types/project";
import { ProjectCard } from "./project-card";

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center  p-6 text-center">
        <h3 className="text-base gap-4 font-semibold flex flex-col justify-center items-center">
          <Tray className="size-15 text-primary" />
          پروژه ای پیدا نشد
        </h3>
        <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          فیلترها را تغییر دهید یا بعداً دوباره بررسی کنید.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};

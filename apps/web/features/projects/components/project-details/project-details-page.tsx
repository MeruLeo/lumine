"use client";

import { useRouter } from "next/navigation";
import { ProjectDetails } from "../project-details";
import { useProject } from "../../hooks/queries/use-project";
import { useEffect } from "react";

interface ProjectDetailsPageProps {
  projectId: string;
}

export function ProjectDetailsPage({ projectId }: ProjectDetailsPageProps) {
  const router = useRouter();

  const { data: project, isLoading, isError } = useProject(Number(projectId));

  useEffect(() => {
    console.log("projectId:", projectId);
    console.log("numeric projectId:", Number(projectId));
  }, [projectId]);

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError || !project) return <div>پروژه یافت نشد یا خطایی رخ داد.</div>;

  return (
    <ProjectDetails
      project={project}
      collaboration={{
        visible: true,
        onClick: () => router.push(`/projects/${projectId}/collaborate`),
        isLoading: false,
      }}
    />
  );
}

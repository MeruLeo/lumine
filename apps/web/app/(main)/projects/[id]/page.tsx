import { notFound } from "next/navigation";
import { ProjectDetails } from "@/features/projects/components/project-details/index";
import { getMockProjectById } from "@/features/projects/components/mocks/projects.mock";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getMockProjectById(Number(id));

  if (!project) {
    notFound();
  }

  return (
    <main className="px-4 py-8">
      <ProjectDetails project={project} />
    </main>
  );
}

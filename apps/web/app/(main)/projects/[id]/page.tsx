import { ProjectDetailsPage } from "@/features/projects/components/project-details/project-details-page";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return (
    <main className="px-4 py-8">
      <ProjectDetailsPage projectId={id} />
    </main>
  );
}

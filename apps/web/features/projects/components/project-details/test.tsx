"use client";

import { Can } from "@/shared/components/authorization/Can";
import { ProjectAction } from "@/shared/lib/authorization/actions";
import type { Project, ProjectRequest } from "@/features/projects/types";

interface ProjectDetailsPageClientProps {
  project: Project;
  currentUserRequest?: ProjectRequest | null;
}

export function ProjectDetailsPageClient({
  project,
  currentUserRequest = null,
}: ProjectDetailsPageClientProps) {
  const hasRequested = Boolean(currentUserRequest);

  return (
    <main className="space-y-6">
      <section className="rounded-2xl border p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="mt-2 text-default-500">{project.description}</p>
          </div>

          <Can action={ProjectAction.Manage} subject={project}>
            <ProjectManagementMenu project={project} />
          </Can>
        </div>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="font-semibold">اطلاعات پروژه</h2>

        <div className="mt-4 grid gap-3">
          <div>بودجه: {project.budget.toLocaleString("fa-IR")} تومان</div>
          <div>استان: {project.province.name}</div>
          <div>دسته‌بندی: {project.category.name}</div>
          <div>وضعیت: {project.status}</div>
        </div>
      </section>

      <Can
        action={ProjectAction.Apply}
        subject={{
          project,
          hasRequested,
          currentRequest: currentUserRequest,
        }}
      >
        <ApplyToProjectButton projectId={project.id} />
      </Can>
    </main>
  );
}

function ProjectManagementMenu({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-2">
      <button>ویرایش</button>
      <button>درخواست‌ها</button>
      <button>بستن پروژه</button>
    </div>
  );
}

function ApplyToProjectButton({ projectId }: { projectId: number }) {
  return <button>ارسال درخواست همکاری</button>;
}

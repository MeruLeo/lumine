"use client";

import { Can } from "@/shared/components/authorization/can";
import { ProjectAction } from "@/shared/lib/authorization/actions";
import { useState } from "react";

import { CreateProjectModal } from "./employer/add-project-modal";
import { HeaderProjects } from "./header";
import { ProjectList } from "./project-list";
import { useProjects } from "../hooks/queries/use-projects";
import type { GetProjectsParams } from "../types/project-query";

export const MainProjects = () => {
  const [filters, setFilters] = useState<GetProjectsParams>({});

  const { data, isPending, isError, error, refetch } = useProjects(filters);

  const renderContent = () => {
    if (isPending) {
      return (
        <section
          className="flex min-h-64 items-center justify-center"
          aria-busy="true"
          aria-label="در حال دریافت پروژه‌ها"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            در حال دریافت پروژه‌ها...
          </p>
        </section>
      );
    }

    if (isError) {
      return (
        <section className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
          <p className="text-sm font-medium text-red-700 dark:text-red-400">
            دریافت پروژه‌ها با خطا مواجه شد
          </p>

          <p className="text-xs text-red-600/80 dark:text-red-400/80">
            {error instanceof Error ? error.message : "لطفاً دوباره تلاش کنید."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700"
          >
            تلاش مجدد
          </button>
        </section>
      );
    }

    return (
      <section aria-label="فهرست پروژه‌ها">
        <ProjectList projects={data?.items ?? []} />
      </section>
    );
  };

  return (
    <main className="flex flex-col gap-6">
      <HeaderProjects
        initialSearch={filters.search}
        initialProvince={filters.province}
        onSearch={setFilters}
        action={
          <Can action={ProjectAction.Create}>
            <CreateProjectModal />
          </Can>
        }
      />

      {renderContent()}
    </main>
  );
};

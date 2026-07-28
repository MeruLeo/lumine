"use client";

import { HeaderProjects } from "./header";
import { ProjectList } from "./project-list";
import { useProjects } from "../hooks/queries/use-projects";

export const MainProjects = () => {
  const { data, isPending, isError, error, refetch } = useProjects();

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <HeaderProjects />

        <section
          className="flex min-h-64 items-center justify-center"
          aria-busy="true"
          aria-label="در حال دریافت پروژه‌ها"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            در حال دریافت پروژه‌ها...
          </p>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-6">
        <HeaderProjects />

        <section className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/20">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <HeaderProjects />

      <section>
        <ProjectList projects={data?.items ?? []} />
      </section>
    </div>
  );
};

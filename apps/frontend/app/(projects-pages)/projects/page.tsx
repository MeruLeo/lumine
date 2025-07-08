"use client";
import { useEffect } from "react";

import { InboxIcon } from "@/components/icons/icons";
import { ProjectBox } from "@/components/projects/projectBox";
import { useAuth } from "@/hooks/useAuth";
import { useProject } from "@/hooks/useProject";

export default function ProjectsPage() {
  const { user, getMe } = useAuth();
  const { fetchAll, fetchByModelingCode, filteredProjects, projects } =
    useProject();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "model") fetchByModelingCode();
    else fetchAll();
  }, [user]);

  return (
    <div className="w-full hide-scrollbar flex flex-col justify-center items-start gap-6 overflow-auto">
      <main className="w-full flex-col flex">
        <main>
          {filteredProjects.length > 0 ? (
            <ul className="flex gap-4 flex-wrap">
              {filteredProjects.map((p) => (
                <ProjectBox
                  key={p._id}
                  _id={p._id}
                  category={p.category}
                  description={`${p.description}`}
                  startDate={p.startDate}
                  endDate={p.endDate}
                  model={p.model}
                  name={`${p.name}`}
                  status={`${p.status}`}
                />
              ))}
            </ul>
          ) : (
            <p className="text-center my-32 flex flex-col justify-center items-center text-Ash_Gray text-lg mt-8">
              <InboxIcon />
              اینجا خبری نیست
            </p>
          )}
        </main>
      </main>
    </div>
  );
}

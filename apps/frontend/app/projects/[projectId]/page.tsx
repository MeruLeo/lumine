"use client";

import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ProjectsInfo } from "@/components/projects/projectsInfo";
import { useProject } from "@/hooks/useProject";
import { ProjectHeader } from "@/components/projects/project/projectHeader";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

export default function ProjectPage() {
  const pathname = usePathname();
  const { fetchById, currentProject } = useProject();
  const { user, getMe } = useAuth();

  const extractId = pathname.slice(10);

  useEffect(() => {
    fetchById(extractId);
    getMe();
  }, []);

  return (
    <div className="p-4 load-page w-full">
      <header className="flex gap-2 p-2 justify-center w-full rounded-full items-center">
        <ProjectHeader
          name={currentProject?.name ?? "بدون عنوان"}
          role={user?.role}
        />
      </header>

      <main className="flex flex-col justify-center items-center w-full">
        <Tabs radius="full" size="lg">
          <Tab title="مشخصات" className="w-full flex justify-center">
            <ProjectsInfo />
          </Tab>
          <Tab title="توضیحات" className="w-full flex justify-center">
            <div className="bg-Jet_Black_4 load-page min-h-72 gradient-border w-1/2 p-4 rounded-[2.5rem]">
              <span className="text-Ash_Gray">توضیحات</span>
              <p className="text-xl">{currentProject?.description}</p>
            </div>
          </Tab>
        </Tabs>
      </main>
    </div>
  );
}

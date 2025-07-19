"use client";

import { Tab, Tabs } from "@heroui/react";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full load-page p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">مدیریت</h1>
      </div>
      <div className="my-8">
        <Tabs radius="full" size="lg">
          <Tab key="models" title="مدل ها" href="/management" />
          <Tab key="projects" title="پروژه ها" href="/management/projects" />
          <Tab key="tickets" title="تیکت ها" href="/management/tickets" />
          <Tab
            key="notifications"
            title="اعلامیه ها"
            href="/management/notifications"
          />
        </Tabs>
      </div>
      <div>{children}</div>
    </section>
  );
}

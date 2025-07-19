"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProjectsSecs } from "@/components/projects/projectsSec";
import { IProjectsSec } from "@/types/projects";
import {
  AllProjectsIcon,
  CheckIcon,
  ClockOrgIcon,
  GroupIcon,
  PlusIcon,
  UserIcon,
} from "@/components/icons/icons";
import { Button, Tab, Tabs } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import NewNotificationModal from "@/components/inbox/NewNotifModal";
import NewTicketModal from "@/components/inbox/NewTicketModal";
import { useProject } from "@/hooks/useProject";
import { useEffect, useState } from "react";

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, getMe } = useAuth();
  const { projects, fetchByModelingCode } = useProject();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getMe();
    fetchByModelingCode();
  }, []);

  const activeTab = pathname.includes("tickets") ? "tickets" : "inbox";

  const ticketsSecArray: IProjectsSec[] = [
    {
      name: "همه",
      icon: <AllProjectsIcon />,
      link: "/inbox/tickets",
      color: "from-yellow-800",
      secondColor: "to-green-300",
      count: 0,
    },
    {
      name: "در انتظار پاسخ",
      icon: <ClockOrgIcon />,
      link: "/inbox/tickets/open",
      color: "from-blue-800",
      secondColor: "to-green-400",
      count: 0,
    },
    {
      name: "پاسخ داده",
      icon: <CheckIcon />,
      link: "/inbox/tickets/in-progress",
      color: "from-green-700",
      count: 0,
      secondColor: "to-yellow-400",
    },
  ];

  const notifsSecArray: IProjectsSec[] = [
    {
      name: "همه",
      icon: <AllProjectsIcon />,
      link: "/inbox",
      color: "from-yellow-800",
      secondColor: "to-green-300",
      count: 0,
    },
    {
      name: "شخصی",
      icon: <UserIcon />,
      link: "/inbox/personal",
      color: "from-red-800",
      secondColor: "to-blue-300",
      count: 0,
    },
    {
      name: "همگانی",
      icon: <GroupIcon />,
      link: "/inbox/global",
      color: "from-red-700",
      count: 0,
      secondColor: "to-yellow-400",
    },
  ];

  return (
    <section className="w-full load-page p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">صندوق</h1>

        {user && (
          <Button
            radius="full"
            className="bg-Slate_Blue"
            startContent={<PlusIcon />}
            size="lg"
            onPress={() => setIsOpen(true)}
          >
            {user.role === "admin" ? "اعلامیه جدید" : "تیکت جدید"}
          </Button>
        )}

        {user?.role === "admin" && (
          <NewNotificationModal isOpen={isOpen} onOpenChange={setIsOpen} />
        )}

        {user?.role === "model" && (
          <NewTicketModal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            projects={projects}
            reporterId={`${user._id}`}
          />
        )}
      </div>

      {/* تب‌هایی که به route لینک دارن */}
      <div className="my-8">
        <Tabs radius="full" size="lg" selectedKey={activeTab}>
          <Tab key="inbox" title="اعلامیه‌ها" href="/inbox" />
          <Tab key="tickets" title="تیکت‌ها" href="/inbox/tickets" />
        </Tabs>
      </div>

      {/* سکشن بالا برای هر تب */}
      <div className="mt-8 gap-4 flex flex-col">
        <header className="w-full">
          {activeTab === "tickets" && (
            <ProjectsSecs projectsSecs={ticketsSecArray} />
          )}
          {activeTab === "inbox" && (
            <ProjectsSecs projectsSecs={notifsSecArray} />
          )}
        </header>

        {/* محتوای صفحه */}
        {children}
      </div>
    </section>
  );
}

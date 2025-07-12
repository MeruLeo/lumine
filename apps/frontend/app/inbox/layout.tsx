"use client";

import { SearchIcon } from "@/components/icons";
import {
  AllProjectsIcon,
  CheckIcon,
  ClockOrgIcon,
  GroupIcon,
  PlusIcon,
  UserIcon,
  XIcon,
} from "@/components/icons/icons";
import NewProjectModal from "@/components/projects/NewProjectModal";
import { ProjectsSecs } from "@/components/projects/projectsSec";
import { useAuth } from "@/hooks/useAuth";
import { IProjectsSec } from "@/types/projects";
import { Button, Input, Tab, Tabs } from "@heroui/react";
import { useEffect, useState } from "react";

export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getMe, user } = useAuth();

  const [btnType, setBtnType] = useState<"ticket" | "notif">("ticket");

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "model") setBtnType("ticket");
    else setBtnType("notif");
  }, [user]);

  const ticketsSecArray: IProjectsSec[] = [
    {
      name: "در انتظار پاسخ",
      icon: <ClockOrgIcon />,
      link: "/projects",
      color: "from-blue-800",
      secondColor: "to-green-400",
      count: 0,
    },
    {
      name: "پاسخ داده",
      icon: <CheckIcon />,
      link: "/projects/completed",
      color: "from-green-700",
      count: 0,
      secondColor: "to-yellow-400",
    },
  ];
  const notifsSecArray: IProjectsSec[] = [
    {
      name: "شخصی",
      icon: <UserIcon />,
      link: "/projects",
      color: "from-red-800",
      secondColor: "to-blue-300",
      count: 0,
    },
    {
      name: "همگانی",
      icon: <GroupIcon />,
      link: "/projects/completed",
      color: "from-red-700",
      count: 0,
      secondColor: "to-yellow-400",
    },
  ];

  return (
    <section className="w-full load-page p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold">صندوق</h1>
        <Button
          radius="full"
          className={`bg-Slate_Blue`}
          startContent={<PlusIcon />}
          size="lg"
          // onPress={() => setIsOpen(true)}
        >
          {btnType === "ticket" ? "تیکت جدید" : "اعلامیه جدید"}
        </Button>
        {/* <NewProjectModal isOpen={isOpen} onOpenChange={setIsOpen} /> */}
      </div>
      <Tabs radius="full" size="lg" className="my-8 -mb-4">
        <Tab title="تیکت ها">
          <div className="w-full load-page mt-8 gap-4 flex flex-col">
            <header className="w-full">
              <ProjectsSecs projectsSecs={ticketsSecArray} />
            </header>
            <Input
              className="w-fit"
              radius="full"
              placeholder="جستجو بر اساس نام تیکت"
              startContent={<SearchIcon />}
              size="lg"
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            {children}
          </div>
        </Tab>
        <Tab title="اعلامیه ها">
          <div className="w-full load-page mt-8 gap-4 flex flex-col">
            <header className="w-full">
              <ProjectsSecs projectsSecs={notifsSecArray} />
            </header>
            {children}
          </div>
        </Tab>
      </Tabs>
    </section>
  );
}

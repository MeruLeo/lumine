"use client";

import { usePathname } from "next/navigation";

import {
  BackIcon,
  CheckIcon,
  DocIcon,
  EllipsIcon,
  UserIcon,
} from "@/components/icons/icons";

import { Button } from "@heroui/button";
import clsx from "clsx";

const pages = [
  { name: "اطلاعات شخصی", path: "/auth/register/info", icon: UserIcon },
  {
    name: "اطلاعات فنی",
    path: "/auth/register/info/technical",
    icon: DocIcon,
  },
  {
    name: "تایید نهایی",
    path: "/auth/register/info/success",
    icon: CheckIcon,
  },
];

export default function RegisterPersonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const currentPage = pages.find((page) => page.path === pathname);
  const currentPageName = currentPage?.name ?? "مرحله ثبت‌نام";

  return (
    <section className="flex  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center  justify-center">
      <div className="w-full flex flex-col items-center gap-4 text-center">
        {/* نوار عنوان و دکمه‌ها */}
        {/* <div className="flex z-50 items-center gap-4">
          <Button
            isIconOnly
            radius="full"
            className="bg-Jet_Black_4 border border-Jet_Black_3"
          >
            <BackIcon />
          </Button>

          <div className="bg-Jet_Black_4 border border-Jet_Black_3 flex items-center justify-center p-2 px-10 rounded-full">
            {currentPageName}
          </div>

          <Button
            isIconOnly
            radius="full"
            className="bg-Jet_Black_4 border border-Jet_Black_3"
          >
            <EllipsIcon />
          </Button>
        </div> */}

        {/* فرم یا محتوای اصلی */}
        {children}
      </div>
    </section>
  );
}

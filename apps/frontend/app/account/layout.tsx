import { UserIcon } from "@/components/icons/icons";
import { ISidebarLink, SideBar } from "@/components/sideBar";
import { TransitionChild } from "@headlessui/react";
import {
  ArrowLeftCircleIcon,
  PencilSquareIcon,
  PhoneXMarkIcon,
} from "@heroicons/react/20/solid";

const sidebarLinks: ISidebarLink[] = [
  {
    title: "ویرایش",
    link: "/account/edit",
    icon: <UserIcon />,
  },
  {
    title: "خروج از حساب",
    link: "/account/logout",
    icon: <UserIcon />,
  },
  {
    title: "درخواست قطع همکاری",
    link: "/account/exit",
    icon: <UserIcon />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <div className="w-full hide-scrollbar">{children}</div>
    </section>
  );
}

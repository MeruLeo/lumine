"use client";

import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  BackIcon,
  HomeIcon,
  InboxIcon,
  ProjectsIcon,
  SendFormIcon,
  ConfIcon,
  UserSolidIcon,
  BellIcon,
} from "./icons/icons";
import { Logo } from "./icons";

import { IMainPage } from "@/types";
import { useAuth } from "@/hooks/useAuth";

const mainPagesArray: IMainPage[] = [
  {
    name: "خانه",
    link: "/home",
    icon: <HomeIcon />,
    access: "everyone",
  },
  {
    name: "پروژه ها",
    link: "/projects",
    icon: <ProjectsIcon />,
    access: "everyone",
  },
  {
    name: "صندوق",
    link: "/inbox",
    icon: <BellIcon />,
    access: "everyone",
  },
  {
    name: "حساب",
    link: "/account",
    icon: <UserSolidIcon />,
    access: "everyone",
  },
  {
    name: "مدیریت",
    link: "/management",
    icon: <ConfIcon />,
    access: "admins",
  },
];

const MainPage = ({ name, link, icon }: IMainPage) => {
  const pathname = usePathname();

  const isActive = pathname === link || pathname.startsWith(link + "/");

  return (
    <li key={name}>
      <Link href={link}>
        <span
          className={`${isActive ? "bg-Porcelain_White text-Jet_Black" : "bg-Jet_Black_4 text-Ash_Gray"} transition-all duration-200 hover:bg-Jet_Black_3 w-[3.5rem] h-[3.5rem] flex justify-center items-center rounded-full`}
        >
          {icon}
        </span>
      </Link>
    </li>
  );
};

export const SideNavbar = ({}) => {
  const { user, getMe, isLoading, error } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  const visibleLinks = mainPagesArray.filter(
    (link) =>
      link.access === "everyone" ||
      (link.access === "admins" && user?.role === "admin"),
  );

  return (
    <>
      <div className="bg-Slate_Blue w-56 h-56 rounded-full blur-3xl -top-36 -right-28 absolute" />
      <aside
        className={`flex flex-col justify-between items-center m-4 transition-all duration-400`}
      >
        <header className="flex justify-between z-50 items-center">
          <Logo />
        </header>
        <ul className={`flex flex-col gap-4`}>
          {visibleLinks.map((mp) => (
            <MainPage
              key={mp.name}
              access={mp.access}
              icon={mp.icon}
              link={mp.link}
              name={mp.name}
            />
          ))}
        </ul>
        <li className="list-none">
          <Link href={"#"}>
            <span
              className={`bg-Jet_Black_4 transition-all duration-200 hover:bg-Jet_Black_3 text-Porcelain_White w-[3.5rem] h-[3.5rem] flex justify-center items-center rounded-full`}
            >
              <BackIcon />
            </span>
          </Link>
        </li>
      </aside>
    </>
  );
};

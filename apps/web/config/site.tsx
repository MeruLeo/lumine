export type SiteConfig = typeof siteConfig;
import { NavMenuItem } from "@/shared/types/site";
import {
  XCircle,
  UserIcon,
  Component,
  Activity,
  Clock,
  CheckCircle,
  BellDot,
} from "lucide-react";
import {
  Bell,
  Gear,
  HouseFill,
  BriefcaseFill,
  BellFill,
  CommentFill,
  StarFill,
} from "@gravity-ui/icons";

export const siteConfig = {
  name: "لومینه",
  description: "رویای دیده شدنت رو به واقعیت تبدیل کن",

  navItems: [
    {
      label: "خانه",
      href: "/",
      icon: <HouseFill className="scale-150" />,
      type: "link",
    },

    // {
    //   label: "مدل ها",
    //   href: "/models",
    //   icon: <StarFill className="scale-150" />,
    //   type: "link",
    // },
    {
      label: "پروژه ها",
      icon: <BriefcaseFill className="scale-150" />,
      type: "link",
      href: "/projects",
    },
    {
      label: "اعلانات",
      icon: <BellFill className="scale-150" />,
      type: "link",
      href: "/notifications",
    },

    {
      label: "پیام ها",
      href: "/messages",
      icon: <CommentFill className="scale-150" />,
      type: "link",
    },
  ] as NavMenuItem[],

  navMenuItems: [
    {
      type: "dropdown",
      label: "پروفایل",
      items: [
        { label: "مشاهده پروفایل", href: "/profile" },
        { label: "پرتفولیو", href: "/portfolio" },
        { label: "خروج از حساب", href: "/logout" },
      ],
      icon: <UserIcon />,
    },
    {
      type: "modal",
      label: "تنظیمات",
      modalId: "settings",
      icon: <Gear className="scale-150" />,
    },
    {
      type: "link",
      label: "اعلانات",
      href: "/notifications",
      icon: <Bell />,
    },
  ] as NavMenuItem[],

  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};

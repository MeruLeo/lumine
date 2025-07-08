"use client";

import { usePathname } from "next/navigation";

import { SideNavbar } from "./sideNavbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const hideOnRoutes = ["/auth"];
  const shouldHide = hideOnRoutes.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;

  return <SideNavbar />;
}

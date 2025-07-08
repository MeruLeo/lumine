"use client";

import { usePathname } from "next/navigation";

import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const hideOnRoutes = ["/auth"];
  const shouldHide = hideOnRoutes.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;

  return <Header />;
}

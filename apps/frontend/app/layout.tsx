import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Link } from "@heroui/link";

import { Providers } from "./providers";

import { ConditionalNavbar } from "@/components/conditionalNavbar";
import { siteConfig } from "@/config/site";
import { fontSfMed } from "@/config/fonts";
import MainPages from "@/components/mainPages";
import { SideNavbar } from "@/components/sideNavbar";
import { Header } from "@/components/header";
import { ConditionalHeader } from "@/components/conditionalHeader";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning dir="rtl" lang="en">
      <head />
      <body
        className={clsx(
          " text-Porcelain_White w-full h-screen overflow-auto bg-Jet_Black font-sf_med",
          fontSfMed.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative w-full transition-all duration-200 flex h-screen">
            <ConditionalNavbar />
            <main className="container hide-scrollbar w-full mx-auto flex-grow h-screen overflow-auto relative">
              <ConditionalHeader />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

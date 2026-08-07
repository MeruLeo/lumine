import { MainNotifications } from "@/features/notifications/components/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اعلان‌ها",
};

export default function NotificationsPage() {
  return (
    <section className="flex flex-col gap-4 p-4 sm:p-6 lg:p-10">
      <header>
        <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          آخرین رویدادها و پیام‌های حساب کاربری شما
        </p>
      </header>

      <MainNotifications />
    </section>
  );
}

import { NotificationPanel } from "@/features/notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اعلانات",
};

export default function Notifications() {
  return (
    <section className="flex flex-col gap-4 p-10">
      <header>
        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
          آخرین اعلان‌ها، هشدارها و فرصت‌های مرتبط با شما
        </p>
      </header>
      <NotificationPanel />
    </section>
  );
}

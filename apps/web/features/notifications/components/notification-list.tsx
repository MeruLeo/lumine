// web/features/notifications/components/notification-list.tsx

import { Bell } from "@gravity-ui/icons";
import type { NotificationRecipient } from "../types/notifications";
import { NotificationItem } from "./notification-item";

interface NotificationListProps {
  notifications: NotificationRecipient[];
  activeFilter?: boolean;
}

function getEmptyStateContent(activeFilter?: boolean) {
  if (activeFilter === false) {
    return {
      title: "اعلان خوانده‌نشده‌ای ندارید",
      description: "همه اعلان‌های شما بررسی شده‌اند.",
    };
  }

  if (activeFilter === true) {
    return {
      title: "اعلان خوانده‌شده‌ای ندارید",
      description: "اعلان‌هایی که بررسی می‌کنید در این قسمت قرار می‌گیرند.",
    };
  }

  return {
    title: "اعلانی وجود ندارد",
    description:
      "اعلان‌های جدید حساب کاربری شما در این قسمت نمایش داده می‌شوند.",
  };
}

export const NotificationList = ({
  notifications,
  activeFilter,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    const emptyState = getEmptyStateContent(activeFilter);

    return (
      <section className="flex min-h-[260px] flex-col items-center justify-center p-6 text-center">
        <Bell className="size-14 text-primary" />

        <h3 className="mt-4 text-base font-semibold">{emptyState.title}</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary-light dark:text-text-secondary-dark">
          {emptyState.description}
        </p>
      </section>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {notifications.map((recipient) => (
        <li key={recipient.id}>
          <NotificationItem recipient={recipient} />
        </li>
      ))}
    </ul>
  );
};

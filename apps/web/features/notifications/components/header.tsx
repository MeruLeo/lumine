"use client";

import { Bell } from "@gravity-ui/icons";
import type { GetNotificationsParams } from "../types/notification-query";

type NotificationFilter = "all" | "unread" | "read";

interface NotificationsHeaderProps {
  filters: GetNotificationsParams;
  unreadCount: number;
  isUnreadCountLoading?: boolean;
  onFiltersChange: (filters: GetNotificationsParams) => void;
}

interface FilterOption {
  key: NotificationFilter;
  label: string;
  isSeen?: boolean;
}

const filterOptions: FilterOption[] = [
  {
    key: "all",
    label: "همه",
  },
  {
    key: "unread",
    label: "خوانده‌نشده",
    isSeen: false,
  },
  {
    key: "read",
    label: "خوانده‌شده",
    isSeen: true,
  },
];

function getActiveFilter(filters: GetNotificationsParams): NotificationFilter {
  if (filters.isSeen === false) return "unread";
  if (filters.isSeen === true) return "read";

  return "all";
}

export const NotificationsHeader = ({
  filters,
  unreadCount,
  isUnreadCountLoading = false,
  onFiltersChange,
}: NotificationsHeaderProps) => {
  const activeFilter = getActiveFilter(filters);

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Bell className="size-5" />
        </span>

        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold">اعلان‌ها</h2>

          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
            {isUnreadCountLoading
              ? "در حال بررسی اعلان‌های جدید..."
              : unreadCount > 0
                ? `${unreadCount} اعلان خوانده‌نشده دارید`
                : "اعلان خوانده‌نشده‌ای ندارید"}
          </p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="فیلتر وضعیت اعلان‌ها"
        className="grid w-full grid-cols-3 gap-1 rounded-xl bg-text-on-accent-light p-1 dark:bg-text-on-accent-dark sm:w-fit"
      >
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.key;

          return (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() =>
                onFiltersChange({
                  isSeen: option.isSeen,
                })
              }
              className={[
                "min-h-9 rounded-lg px-3 text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive
                  ? "bg-primary text-white"
                  : "text-text-secondary-light hover:bg-black/5 dark:text-text-secondary-dark dark:hover:bg-white/5",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

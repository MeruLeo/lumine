"use client";

import { Bell } from "@gravity-ui/icons";
import { Tabs } from "@heroui/react";
import type { Key } from "react";
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
  if (filters.isSeen === false) {
    return "unread";
  }

  if (filters.isSeen === true) {
    return "read";
  }

  return "all";
}

function isNotificationFilter(key: Key): key is NotificationFilter {
  return key === "all" || key === "unread" || key === "read";
}

export const NotificationsHeader = ({
  filters,
  unreadCount,
  isUnreadCountLoading = false,
  onFiltersChange,
}: NotificationsHeaderProps) => {
  const activeFilter = getActiveFilter(filters);

  const handleFilterChange = (key: Key) => {
    if (!isNotificationFilter(key)) {
      return;
    }

    const selectedOption = filterOptions.find((option) => option.key === key);

    if (!selectedOption) {
      return;
    }

    onFiltersChange({
      ...filters,
      isSeen: selectedOption.isSeen,
    });
  };

  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
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

      <Tabs
        selectedKey={activeFilter}
        onSelectionChange={handleFilterChange}
        className="w-full sm:w-fit"
      >
        <Tabs.ListContainer className="w-full sm:w-fit">
          <Tabs.List aria-label="فیلتر وضعیت اعلان‌ها">
            {filterOptions.map((option) => (
              <Tabs.Tab key={option.key} id={option.key}>
                {option.label}

                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </section>
  );
};

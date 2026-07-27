"use client";

import { useMemo, useState } from "react";
import {
  NotificationFiltersState,
  NotificationItemModel,
} from "../types/notification";
import { filterNotifications } from "../utils/helpers/notification";
import { mockNotifications } from "../utils/mock";

const initialFilters: NotificationFiltersState = {
  type: "all",
  status: "all",
  search: "",
};

export function useNotifications(
  initialData: NotificationItemModel[] = mockNotifications,
) {
  const [notifications, setNotifications] =
    useState<NotificationItemModel[]>(initialData);

  const [filters, setFilters] =
    useState<NotificationFiltersState>(initialFilters);

  const filteredNotifications = useMemo(() => {
    return filterNotifications(notifications, filters);
  }, [notifications, filters]);

  const unreadCount = useMemo(() => {
    return notifications.filter((item) => item.recipient?.isSeen === false)
      .length;
  }, [notifications]);

  const markAsSeen = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notificationId
          ? {
              ...item,
              recipient: item.recipient
                ? {
                    ...item.recipient,
                    isSeen: true,
                    seenAt: new Date().toISOString(),
                  }
                : item.recipient,
            }
          : item,
      ),
    );
  };

  const markAllAsSeen = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        recipient: item.recipient
          ? {
              ...item.recipient,
              isSeen: true,
              seenAt: item.recipient.seenAt ?? new Date().toISOString(),
            }
          : item.recipient,
      })),
    );
  };

  return {
    notifications,
    filteredNotifications,
    filters,
    setFilters,
    unreadCount,
    markAsSeen,
    markAllAsSeen,
  };
}

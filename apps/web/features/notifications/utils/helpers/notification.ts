import {
  NotificationItemModel,
  NotificationType,
} from "../../types/notification";

export const notificationTypeLabels: Record<NotificationType, string> = {
  system: "سیستم",
  promotion: "پروموشن",
  warning: "هشدار",
  info: "اطلاعات",
};

export const notificationTypeClasses: Record<NotificationType, string> = {
  system: "bg-foreground text-background",
  promotion: "bg-green",
  warning: "bg-orange",
  info: "bg-pink",
};

export function getNotificationTypeLabel(type: NotificationType | null) {
  if (!type) return "عمومی";
  return notificationTypeLabels[type];
}

export function getNotificationTypeClass(type: NotificationType | null) {
  if (!type) return "bg-gray-100 text-gray-700 border-gray-200";
  return notificationTypeClasses[type];
}

export function isNotificationExpired(notification: NotificationItemModel) {
  if (!notification.expiredAt) return false;
  return new Date(notification.expiredAt).getTime() < Date.now();
}

export function formatNotificationDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function filterNotifications(
  notifications: NotificationItemModel[],
  filters: {
    type: NotificationType | "all";
    status: "all" | "seen" | "unseen";
    search: string;
  },
) {
  return notifications.filter((item) => {
    const matchesType =
      filters.type === "all" ? true : item.type === filters.type;

    const matchesStatus =
      filters.status === "all"
        ? true
        : filters.status === "seen"
          ? item.recipient?.isSeen === true
          : item.recipient?.isSeen === false;

    const search = filters.search.trim().toLowerCase();
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search) ||
      item.message.toLowerCase().includes(search);

    return matchesType && matchesStatus && matchesSearch;
  });
}

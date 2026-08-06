import type { GetNotificationsParams } from "../types/notification-query";

export const notificationQueryKeys = {
  all: ["notifications"] as const,

  lists: () => [...notificationQueryKeys.all, "list"] as const,
  list: (params?: GetNotificationsParams) =>
    [...notificationQueryKeys.lists(), params ?? {}] as const,

  details: () => [...notificationQueryKeys.all, "detail"] as const,
  detail: (notificationRecipientId: number) =>
    [...notificationQueryKeys.details(), notificationRecipientId] as const,
};

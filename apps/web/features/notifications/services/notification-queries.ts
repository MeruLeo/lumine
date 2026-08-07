import { queryOptions } from "@tanstack/react-query";
import {
  getNotificationRecipient,
  getNotifications,
} from "../api/notifications";
import { notificationQueryKeys } from "../constants/notification-query-keys";
import type { GetNotificationsParams } from "../types/notification-query";

export const notificationsQueryOptions = (params?: GetNotificationsParams) =>
  queryOptions({
    queryKey: notificationQueryKeys.list(params),
    queryFn: () => getNotifications(params),
  });

export const notificationRecipientQueryOptions = (
  notificationRecipientId: number,
) =>
  queryOptions({
    queryKey: notificationQueryKeys.detail(notificationRecipientId),
    queryFn: () => getNotificationRecipient(notificationRecipientId),
    enabled:
      Number.isFinite(notificationRecipientId) && notificationRecipientId > 0,
  });

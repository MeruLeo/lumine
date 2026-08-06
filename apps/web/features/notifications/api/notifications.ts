import { axiosInstance } from "@/shared/lib/http/axios";
import type {
  MarkNotificationSeenDto,
  NotificationRecipientDetailDto,
  NotificationsListDto,
} from "../types/notifications-api";
import type { NotificationRecipient } from "../types/notifications";
import type { NotificationsListResponse } from "../types/notification-list";
import type { GetNotificationsParams } from "../types/notification-query";
import {
  notificationRecipientDtoToNotificationRecipient,
  notificationRecipientsDtoToNotificationsListResponse,
} from "../lib/notification-adapters";

function buildNotificationsParams(params?: GetNotificationsParams) {
  if (!params) return undefined;

  return {
    is_seen: params.isSeen,
  };
}

export async function getNotifications(
  params?: GetNotificationsParams,
): Promise<NotificationsListResponse> {
  const { data } = await axiosInstance.get<NotificationsListDto>(
    "/notifications/recipients/",
    {
      params: buildNotificationsParams(params),
    },
  );

  return notificationRecipientsDtoToNotificationsListResponse(data.data);
}

export async function getNotificationRecipient(
  notificationRecipientId: number,
): Promise<NotificationRecipient> {
  const { data } = await axiosInstance.get<NotificationRecipientDetailDto>(
    `/notifications/recipients/${notificationRecipientId}/`,
  );

  return notificationRecipientDtoToNotificationRecipient(data.data);
}

export async function markNotificationRecipientAsSeen(
  notificationRecipientId: number,
): Promise<NotificationRecipient> {
  const { data } = await axiosInstance.put<MarkNotificationSeenDto>(
    `/notifications/recipients/${notificationRecipientId}/`,
  );

  return notificationRecipientDtoToNotificationRecipient(data.data);
}

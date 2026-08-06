import type {
  NotificationDto,
  NotificationRecipientDto,
} from "../types/notifications-api";
import type {
  Notification,
  NotificationRecipient,
} from "../types/notifications";
import type { NotificationsListResponse } from "../types/notification-list";

export function notificationDtoToNotification(
  dto: NotificationDto,
): Notification {
  return {
    id: dto.id,
    title: dto.title,
    message: dto.message,

    typeSender: dto.type_sender,
    typeNotif: dto.type_notif,

    isGlobal: dto.is_global,

    createdAt: dto.created_at,
    expiredAt: dto.expired_at,

    role: dto.role,
    sender: dto.sender,
    category: dto.category,
    user: dto.user,
  };
}

export function notificationRecipientDtoToNotificationRecipient(
  dto: NotificationRecipientDto,
): NotificationRecipient {
  return {
    id: dto.id,

    isSeen: dto.is_seen,
    seenAt: dto.seen_at,
    created: dto.created,

    notification: notificationDtoToNotification(dto.notification),
    receiver: dto.receiver,
  };
}

export function notificationRecipientsDtoToNotificationsListResponse(
  dto: NotificationRecipientDto[],
): NotificationsListResponse {
  return {
    items: dto.map(notificationRecipientDtoToNotificationRecipient),
    count: dto.length,
  };
}

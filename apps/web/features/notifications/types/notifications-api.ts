import type { ApiEnvelopeDto } from "@/shared/types/api";
import type {
  NotificationSenderType,
  NotificationTargetRole,
  NotificationType,
} from "./notifications";

export interface NotificationDto {
  id: number;
  title: string;
  message: string;

  type_sender: NotificationSenderType | null;
  type_notif: NotificationType | null;

  is_global: boolean;

  created_at: string;
  expired_at: string | null;

  role: NotificationTargetRole | null;
  sender: number | null;
  category: number | null;
  user: number | null;
}

export interface NotificationRecipientDto {
  id: number;

  is_seen: boolean;
  seen_at: string | null;
  created: string;

  notification: NotificationDto;
  receiver: number;
}

export type NotificationsListDto = ApiEnvelopeDto<NotificationRecipientDto[]>;

export type NotificationRecipientDetailDto =
  ApiEnvelopeDto<NotificationRecipientDto>;

export type MarkNotificationSeenDto = ApiEnvelopeDto<NotificationRecipientDto>;

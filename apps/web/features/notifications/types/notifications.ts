export type NotificationSenderType = "lumine" | "user";

export type NotificationType = "success" | "warning" | "info";

export type NotificationTargetRole = "model" | "employer" | "instructor";

export interface Notification {
  id: number;
  title: string;
  message: string;

  typeSender: NotificationSenderType | null;
  typeNotif: NotificationType | null;

  isGlobal: boolean;

  createdAt: string;
  expiredAt: string | null;

  role: NotificationTargetRole | null;
  sender: number | null;
  category: number | null;
  user: number | null;
}

export interface NotificationRecipient {
  id: number;

  isSeen: boolean;
  seenAt: string | null;
  created: string;

  notification: Notification;
  receiver: number;
}

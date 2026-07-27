export type NotificationType = "system" | "promotion" | "warning" | "info";

export type NotificationRole = "model" | "employer" | "instructor";

export interface NotificationUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string | null;
}

export interface NotificationCategory {
  id: number;
  name: string;
  slug?: string;
}

export interface NotificationBase {
  id: number;
  title: string;
  message: string;
  sender: NotificationUser;

  type: NotificationType | null;
  isGlobal: boolean;

  createdAt: string;
  expiredAt: string | null;

  role: NotificationRole | null;
  category: NotificationCategory | null;
  user: NotificationUser | null;
}

export interface NotificationRecipient {
  id: number;
  notificationId: number;
  receiver: NotificationUser;
  isSeen: boolean;
  seenAt: string | null;
  createdAt: string;
}

export interface NotificationItemModel extends NotificationBase {
  recipient: {
    id: number;
    isSeen: boolean;
    seenAt: string | null;
    receiverId: number;
    createdAt: string;
  } | null;
}

export interface NotificationFiltersState {
  type: NotificationType | "all";
  status: "all" | "seen" | "unseen";
  search: string;
}

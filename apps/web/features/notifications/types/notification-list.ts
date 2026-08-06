import type { NotificationRecipient } from "./notifications";

export interface NotificationsListResponse {
  items: NotificationRecipient[];
  count: number;
}

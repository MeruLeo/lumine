import { NotificationItemModel } from "../types/notification";
import { NotificationEmptyState } from "./notification-empty-state";
import { NotificationItem } from "./notification-item";

interface NotificationListProps {
  notifications: NotificationItemModel[];
  onSeen?: (id: number) => void;
}

export function NotificationList({
  notifications,
  onSeen,
}: NotificationListProps) {
  if (!notifications.length) {
    return <NotificationEmptyState />;
  }

  return (
    <div className="flex gap-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onSeen={onSeen}
        />
      ))}
    </div>
  );
}

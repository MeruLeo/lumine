"use client";

import {
  Button,
  Description,
  Dropdown,
  Header,
  Label,
  Separator,
} from "@heroui/react";
import { useNotifications } from "../hooks/use-notifications";
import { NotificationBadge } from "./notification-badge";
import { NotificationFilters } from "./notification-filters";
import { NotificationList } from "./notification-list";
import {
  EllipsisVertical,
  Pencil,
  SquarePlus,
  TrashBin,
} from "@gravity-ui/icons";

export function NotificationPanel() {
  const {
    filteredNotifications,
    filters,
    setFilters,
    unreadCount,
    markAsSeen,
    markAllAsSeen,
  } = useNotifications();

  return (
    <section className="space-y-4">
      <NotificationFilters
        value={filters}
        onChange={setFilters}
        markAllAsSeen={markAllAsSeen}
        unreadCount={unreadCount}
      />

      <NotificationList
        notifications={filteredNotifications}
        onSeen={markAsSeen}
      />
    </section>
  );
}

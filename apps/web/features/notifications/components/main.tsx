"use client";

import { useState } from "react";
import { NotificationsHeader } from "./header";
import { NotificationList } from "./notification-list";
import { NotificationsLoading } from "./notifications-loading";
import { NotificationsError } from "./notifications-error";
import { useNotifications } from "../hooks/queries/use-notifications";
import type { GetNotificationsParams } from "../types/notification-query";

export const MainNotifications = () => {
  const [filters, setFilters] = useState<GetNotificationsParams>({});

  const notificationsQuery = useNotifications(filters);
  const unreadNotificationsQuery = useNotifications({
    isSeen: false,
  });

  const unreadCount = unreadNotificationsQuery.data?.count ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <NotificationsHeader
        filters={filters}
        unreadCount={unreadCount}
        isUnreadCountLoading={unreadNotificationsQuery.isPending}
        onFiltersChange={setFilters}
      />

      {notificationsQuery.isPending ? (
        <NotificationsLoading />
      ) : notificationsQuery.isError ? (
        <NotificationsError
          error={notificationsQuery.error}
          onRetry={() => notificationsQuery.refetch()}
        />
      ) : (
        <NotificationList
          notifications={notificationsQuery.data?.items.toReversed() ?? []}
          activeFilter={filters.isSeen}
        />
      )}
    </div>
  );
};

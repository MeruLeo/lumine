import type { QueryClient, QueryKey } from "@tanstack/react-query";
import { notificationQueryKeys } from "../constants/notification-query-keys";
import type { NotificationRecipient } from "../types/notifications";
import type { NotificationsListResponse } from "../types/notification-list";
import type { GetNotificationsParams } from "../types/notification-query";

function getListParamsFromQueryKey(
  queryKey: QueryKey,
): GetNotificationsParams | undefined {
  return queryKey[2] as GetNotificationsParams | undefined;
}

function shouldKeepRecipientInList(
  recipient: NotificationRecipient,
  params?: GetNotificationsParams,
): boolean {
  if (typeof params?.isSeen !== "boolean") {
    return true;
  }

  return recipient.isSeen === params.isSeen;
}

export function syncNotificationRecipientCache(
  queryClient: QueryClient,
  recipient: NotificationRecipient,
): void {
  queryClient.setQueryData<NotificationRecipient>(
    notificationQueryKeys.detail(recipient.id),
    recipient,
  );

  const cachedLists = queryClient.getQueriesData<NotificationsListResponse>({
    queryKey: notificationQueryKeys.lists(),
  });

  cachedLists.forEach(([queryKey]) => {
    const params = getListParamsFromQueryKey(queryKey);

    queryClient.setQueryData<NotificationsListResponse>(queryKey, (current) => {
      if (!current) {
        return current;
      }

      const hasRecipient = current.items.some(
        (item) => item.id === recipient.id,
      );

      if (!hasRecipient) {
        return current;
      }

      const nextItems = current.items
        .map((item) => (item.id === recipient.id ? recipient : item))
        .filter((item) => shouldKeepRecipientInList(item, params));

      return {
        ...current,
        items: nextItems,
        count: nextItems.length,
      };
    });
  });
}

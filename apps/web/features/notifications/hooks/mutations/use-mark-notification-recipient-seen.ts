// web/features/notifications/hooks/mutations/use-mark-notification-recipient-seen.ts

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationQueryKeys } from "../../constants/notification-query-keys";
import { markNotificationRecipientSeenMutationOptions } from "../../services/notifications";
import { syncNotificationRecipientCache } from "../../services/notification-cache";

export function useMarkNotificationRecipientSeen() {
  const queryClient = useQueryClient();

  return useMutation({
    ...markNotificationRecipientSeenMutationOptions(),

    onSuccess: (recipient) => {
      syncNotificationRecipientCache(queryClient, recipient);

      void queryClient.invalidateQueries({
        queryKey: notificationQueryKeys.lists(),
        refetchType: "active",
      });
    },
  });
}

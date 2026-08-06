// web/features/notifications/hooks/mutations/use-smart-mark-notification-recipient-seen.ts

"use client";

import { useCallback } from "react";
import { useMarkNotificationRecipientSeen } from "./use-mark-notification-recipient-seen";
import type { NotificationRecipient } from "../../types/notifications";

export function useSmartMarkNotificationRecipientSeen() {
  const mutation = useMarkNotificationRecipientSeen();

  const markAsSeen = useCallback(
    (recipient: NotificationRecipient) => {
      if (recipient.isSeen || mutation.isPending) return;

      mutation.mutate(recipient.id);
    },
    [mutation],
  );

  return {
    ...mutation,
    markAsSeen,
  };
}

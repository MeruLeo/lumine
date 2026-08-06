"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationRecipientQueryOptions } from "../../services/notification-queries";

export function useNotificationRecipient(notificationRecipientId: number) {
  return useQuery(notificationRecipientQueryOptions(notificationRecipientId));
}

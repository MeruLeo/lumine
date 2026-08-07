"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsQueryOptions } from "../../services/notification-queries";
import type { GetNotificationsParams } from "../../types/notification-query";

export function useNotifications(params?: GetNotificationsParams) {
  return useQuery(notificationsQueryOptions(params));
}

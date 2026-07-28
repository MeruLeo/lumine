"use client";

import { useMemo } from "react";
import { useMe } from "@/features/profile/hooks/mutations/use-me";
import { can, getPermissionResult } from "@/shared/lib/authorization/can";
import type { AppAction } from "@/shared/lib/authorization/actions";

interface UseCanOptions {
  enabled?: boolean;
}

export function useCan(
  action: AppAction,
  subject?: unknown,
  options?: UseCanOptions,
) {
  const { data: user, isLoading, isFetching } = useMe();

  const enabled = options?.enabled ?? true;

  return useMemo(() => {
    if (!enabled) {
      return {
        allowed: false,
        reason: "غیرفعال است.",
        isLoading,
        isFetching,
      };
    }

    const result = getPermissionResult(user, action, subject as any);

    if (result === true) {
      return {
        allowed: true,
        reason: undefined,
        isLoading,
        isFetching,
      };
    }

    if (result === false) {
      return {
        allowed: false,
        reason: "شما مجوز انجام این عملیات را ندارید.",
        isLoading,
        isFetching,
      };
    }

    return {
      allowed: result.allowed,
      reason: result.reason,
      isLoading,
      isFetching,
    };
  }, [user, action, subject, enabled, isLoading, isFetching]);
}

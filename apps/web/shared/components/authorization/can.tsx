"use client";

import type { ReactNode } from "react";
import { useCan } from "@/shared/hooks/use-can";
import type { AppAction } from "@/shared/lib/authorization/actions";

interface CanProps {
  action: AppAction;
  subject?: unknown;
  children: ReactNode;
  fallback?: ReactNode;
  showFallbackWhileLoading?: boolean;
}

export function Can({
  action,
  subject,
  children,
  fallback = null,
  showFallbackWhileLoading = false,
}: CanProps) {
  const { allowed, isLoading } = useCan(action, subject);

  if (isLoading && showFallbackWhileLoading) {
    return <>{fallback}</>;
  }

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

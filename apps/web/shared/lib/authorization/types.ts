import type { GetMeResponse } from "@/features/profile/types/me";
import type { AppAction } from "./actions";

export type AuthUser = GetMeResponse | null | undefined;

export interface PermissionContext<TSubject = unknown> {
  user: AuthUser;
  action: AppAction;
  subject?: TSubject;
}

export type PermissionResult =
  | boolean
  | {
      allowed: boolean;
      reason?: string;
    };

export type PermissionRule<TSubject = unknown> = (
  context: PermissionContext<TSubject>,
) => PermissionResult;

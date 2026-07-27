import { ProjectAction } from "./actions";
import type { AppAction } from "./actions";
import type { AuthUser, PermissionResult } from "./types";
import {
  canProject,
  type ProjectPermissionAction,
  type ProjectPermissionSubject,
} from "@/features/projects/configs/project-permissions";

function normalizePermissionResult(result: PermissionResult): boolean {
  if (typeof result === "boolean") return result;

  return result.allowed;
}

export function can<TAction extends ProjectPermissionAction>(
  user: AuthUser,
  action: TAction,
  subject?: ProjectPermissionSubject<TAction>,
): boolean;

export function can(
  user: AuthUser,
  action: AppAction,
  subject?: unknown,
): boolean {
  if (Object.values(ProjectAction).includes(action as ProjectAction)) {
    return normalizePermissionResult(
      canProject(user, action as ProjectPermissionAction, subject as never),
    );
  }

  return false;
}

export function getPermissionResult<TAction extends ProjectPermissionAction>(
  user: AuthUser,
  action: TAction,
  subject?: ProjectPermissionSubject<TAction>,
): PermissionResult;

export function getPermissionResult(
  user: AuthUser,
  action: AppAction,
  subject?: unknown,
): PermissionResult {
  if (Object.values(ProjectAction).includes(action as ProjectAction)) {
    return canProject(
      user,
      action as ProjectPermissionAction,
      subject as never,
    );
  }

  return {
    allowed: false,
    reason: "این عملیات در سیستم مجوزها تعریف نشده است.",
  };
}

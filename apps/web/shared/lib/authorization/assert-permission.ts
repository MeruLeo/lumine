import type { AppAction } from "./actions";
import type { AuthUser } from "./types";
import { getPermissionResult } from "./can";

export class AuthorizationError extends Error {
  public readonly statusCode = 403;

  constructor(message = "شما مجوز انجام این عملیات را ندارید.") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export function assertPermission(
  user: AuthUser,
  action: AppAction,
  subject?: unknown,
): void {
  const result = getPermissionResult(user, action as never, subject as never);

  if (result === true) return;

  if (result === false) {
    throw new AuthorizationError();
  }

  if (!result.allowed) {
    throw new AuthorizationError(result.reason);
  }
}

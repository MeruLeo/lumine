import type { GetMeResponse } from "@/features/profile/types/me";
import type { UserRole } from "@/features/auth/types/auth_3";
import type { Project } from "@/features/projects/types/project";

export function isAuthenticated(
  user: GetMeResponse | null | undefined,
): user is GetMeResponse {
  return Boolean(user);
}

export function hasRole(
  user: GetMeResponse | null | undefined,
  role: UserRole,
): boolean {
  if (!user) return false;

  return user.groups.some((group) => group.name === role);
}

export function hasAnyRole(
  user: GetMeResponse | null | undefined,
  roles: UserRole[],
): boolean {
  if (!user) return false;

  return user.groups.some((group) => roles.includes(group.name));
}

export function isEmployer(user: GetMeResponse | null | undefined): boolean {
  return hasRole(user, "employer");
}

export function isModel(user: GetMeResponse | null | undefined): boolean {
  return hasRole(user, "model");
}

export function isInstructor(user: GetMeResponse | null | undefined): boolean {
  return hasRole(user, "instructor");
}

export function isAcceptedUser(
  user: GetMeResponse | null | undefined,
): boolean {
  return user?.status === "accept";
}

export function isProjectOwner(
  user: GetMeResponse | null | undefined,
  project: Project | null | undefined,
): boolean {
  if (!user || !project) return false;

  return project.employer.id === user.id;
}

export function isProjectAssignedModel(
  user: GetMeResponse | null | undefined,
  project: Project | null | undefined,
): boolean {
  if (!user || !project?.model) return false;

  return project.model.id === user.id;
}

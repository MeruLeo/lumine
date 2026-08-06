import { ProjectAction } from "@/shared/lib/authorization/actions";
import type {
  AuthUser,
  PermissionResult,
} from "@/shared/lib/authorization/types";
import {
  isAcceptedUser,
  isAuthenticated,
  isEmployer,
  isModel,
  isProjectAssignedModel,
  isProjectOwner,
} from "@/shared/lib/authorization/guards";

import type {
  Project,
  ProjectRequest,
} from "@/features/projects/types/project";
import type {
  ProjectApplySubject,
  ProjectRequestSubject,
} from "@/features/projects/types/project-permission";

type ProjectPermissionMap = {
  [ProjectAction.Create]: {
    subject?: never;
  };

  [ProjectAction.ViewList]: {
    subject?: never;
  };

  [ProjectAction.View]: {
    subject: Project;
  };

  [ProjectAction.Manage]: {
    subject: Project;
  };

  [ProjectAction.Update]: {
    subject: Project;
  };

  [ProjectAction.Delete]: {
    subject: Project;
  };

  [ProjectAction.Apply]: {
    subject: ProjectApplySubject;
  };

  [ProjectAction.InviteModel]: {
    subject: Project;
  };

  [ProjectAction.ViewRequests]: {
    subject: Project;
  };

  [ProjectAction.AcceptRequest]: {
    subject: ProjectRequestSubject;
  };

  [ProjectAction.RejectRequest]: {
    subject: ProjectRequestSubject;
  };

  [ProjectAction.Close]: {
    subject: Project;
  };

  [ProjectAction.Cancel]: {
    subject: Project;
  };

  [ProjectAction.Complete]: {
    subject: Project;
  };
};

export type ProjectPermissionAction = keyof ProjectPermissionMap;

export type ProjectPermissionSubject<TAction extends ProjectPermissionAction> =
  ProjectPermissionMap[TAction] extends { subject: infer TSubject }
    ? TSubject
    : never;

function allow(): PermissionResult {
  return true;
}

function deny(reason?: string): PermissionResult {
  return {
    allowed: false,
    reason,
  };
}

function isProjectVisibleForUser(
  user: AuthUser,
  project: Project,
): PermissionResult {
  if (!isAuthenticated(user)) {
    return deny("برای مشاهده پروژه باید وارد حساب کاربری شوید.");
  }

  if (!isAcceptedUser(user)) {
    return deny("حساب کاربری شما هنوز تایید نشده است.");
  }

  if (isProjectOwner(user, project)) {
    return allow();
  }

  if (isProjectAssignedModel(user, project)) {
    return allow();
  }

  if (project.moderationStatus !== "approved") {
    return deny("این پروژه هنوز توسط مدیریت تایید نشده است.");
  }

  if (["open", "in_progress", "completed", "closed"].includes(project.status)) {
    return allow();
  }

  return deny("این پروژه در حال حاضر قابل مشاهده نیست.");
}

export function canCreateProject(user: AuthUser): PermissionResult {
  if (!isAuthenticated(user)) {
    return deny("برای ایجاد پروژه باید وارد حساب کاربری شوید.");
  }

  if (!isAcceptedUser(user)) {
    return deny("حساب کاربری شما هنوز تایید نشده است.");
  }

  if (!isEmployer(user)) {
    return deny("فقط کارفرماها امکان ایجاد پروژه دارند.");
  }

  return allow();
}

export function canViewProjectList(user: AuthUser): PermissionResult {
  if (!isAuthenticated(user)) {
    return deny("برای مشاهده پروژه‌ها باید وارد حساب کاربری شوید.");
  }

  if (!isAcceptedUser(user)) {
    return deny("حساب کاربری شما هنوز تایید نشده است.");
  }

  return allow();
}

export function canViewProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  return isProjectVisibleForUser(user, project);
}

export function canManageProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  if (!isAuthenticated(user)) {
    return deny("برای مدیریت پروژه باید وارد حساب کاربری شوید.");
  }

  if (!isAcceptedUser(user)) {
    return deny("حساب کاربری شما هنوز تایید نشده است.");
  }

  if (!isEmployer(user)) {
    return deny("فقط کارفرما می‌تواند پروژه را مدیریت کند.");
  }

  if (!isProjectOwner(user, project)) {
    return deny("فقط مالک پروژه امکان مدیریت آن را دارد.");
  }

  return allow();
}

export function canUpdateProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (["completed", "cancelled"].includes(project.status)) {
    return deny("پروژه تکمیل‌شده یا لغوشده قابل ویرایش نیست.");
  }

  return allow();
}

export function canDeleteProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (!["draft", "open"].includes(project.status)) {
    return deny("فقط پروژه‌های پیش‌نویس یا باز قابل حذف هستند.");
  }

  return allow();
}

export function canApplyToProject(
  user: AuthUser,
  subject: ProjectApplySubject,
): PermissionResult {
  const { project, hasRequested, currentRequest } = subject;

  if (!isAuthenticated(user)) {
    return deny("برای ارسال درخواست همکاری باید وارد حساب کاربری شوید.");
  }

  if (!isAcceptedUser(user)) {
    return deny("حساب کاربری شما هنوز تایید نشده است.");
  }

  if (!isModel(user)) {
    return deny("فقط مدل‌ها امکان ارسال درخواست همکاری دارند.");
  }

  if (isProjectOwner(user, project)) {
    return deny("مالک پروژه نمی‌تواند برای پروژه خودش درخواست ارسال کند.");
  }

  if (project.model) {
    return deny("برای این پروژه قبلاً مدل انتخاب شده است.");
  }

  if (project.moderationStatus !== "approved") {
    return deny("این پروژه هنوز تایید نشده است.");
  }

  if (project.status !== "open") {
    return deny("فقط برای پروژه‌های باز می‌توان درخواست همکاری ارسال کرد.");
  }

  if (hasRequested || currentRequest) {
    return deny("شما قبلاً برای این پروژه درخواست ارسال کرده‌اید.");
  }

  return allow();
}

export function canInviteModel(
  user: AuthUser,
  project: Project,
): PermissionResult {
  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (project.model) {
    return deny("برای این پروژه قبلاً مدل انتخاب شده است.");
  }

  if (project.status !== "open") {
    return deny("فقط در پروژه‌های باز می‌توان دعوت همکاری ارسال کرد.");
  }

  if (project.moderationStatus !== "approved") {
    return deny("پروژه هنوز توسط مدیریت تایید نشده است.");
  }

  return allow();
}

export function canViewProjectRequests(
  user: AuthUser,
  project: Project,
): PermissionResult {
  return canManageProject(user, project);
}

export function canAcceptProjectRequest(
  user: AuthUser,
  subject: ProjectRequestSubject,
): PermissionResult {
  const { project, request } = subject;

  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (project.model) {
    return deny("برای این پروژه قبلاً مدل انتخاب شده است.");
  }

  if (project.status !== "open") {
    return deny("فقط در پروژه باز می‌توان درخواست را پذیرفت.");
  }

  if (request.status !== "pendding") {
    return deny("فقط درخواست‌های در انتظار قابل پذیرش هستند.");
  }

  return allow();
}

export function canRejectProjectRequest(
  user: AuthUser,
  subject: ProjectRequestSubject,
): PermissionResult {
  const { project, request } = subject;

  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (request.status !== "pendding") {
    return deny("فقط درخواست‌های در انتظار قابل رد کردن هستند.");
  }

  return allow();
}

export function canCloseProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (!["open", "in_progress"].includes(project.status)) {
    return deny("فقط پروژه‌های باز یا در حال اجرا قابل بستن هستند.");
  }

  return allow();
}

export function canCancelProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (["completed", "closed", "cancelled"].includes(project.status)) {
    return deny("این پروژه قابل لغو نیست.");
  }

  return allow();
}

export function canCompleteProject(
  user: AuthUser,
  project: Project,
): PermissionResult {
  const manageResult = canManageProject(user, project);

  if (manageResult !== true) return manageResult;

  if (project.status !== "in_progress") {
    return deny("فقط پروژه‌های در حال اجرا قابل تکمیل هستند.");
  }

  return allow();
}

export function canProject<TAction extends ProjectPermissionAction>(
  user: AuthUser,
  action: TAction,
  subject?: ProjectPermissionSubject<TAction>,
): PermissionResult {
  switch (action) {
    case ProjectAction.Create:
      return canCreateProject(user);

    case ProjectAction.ViewList:
      return canViewProjectList(user);

    case ProjectAction.View:
      return canViewProject(user, subject as Project);

    case ProjectAction.Manage:
      return canManageProject(user, subject as Project);

    case ProjectAction.Update:
      return canUpdateProject(user, subject as Project);

    case ProjectAction.Delete:
      return canDeleteProject(user, subject as Project);

    case ProjectAction.Apply:
      return canApplyToProject(user, subject as ProjectApplySubject);

    case ProjectAction.InviteModel:
      return canInviteModel(user, subject as Project);

    case ProjectAction.ViewRequests:
      return canViewProjectRequests(user, subject as Project);

    case ProjectAction.AcceptRequest:
      return canAcceptProjectRequest(user, subject as ProjectRequestSubject);

    case ProjectAction.RejectRequest:
      return canRejectProjectRequest(user, subject as ProjectRequestSubject);

    case ProjectAction.Close:
      return canCloseProject(user, subject as Project);

    case ProjectAction.Cancel:
      return canCancelProject(user, subject as Project);

    case ProjectAction.Complete:
      return canCompleteProject(user, subject as Project);

    default:
      return deny("این عملیات تعریف نشده است.");
  }
}

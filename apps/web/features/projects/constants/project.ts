import type { ProjectStatus, ModerationStatus } from "../types/project";

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "پیش‌نویس",
  open: "باز",
  in_progress: "در حال اجرا",
  completed: "تکمیل شده",
  closed: "بسته شده",
  cancelled: "لغو شده",
};

export const PROJECT_STATUS_STYLES: Record<ProjectStatus, string> = {
  draft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  open: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  completed: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  closed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export const MODERATION_STATUS_LABELS: Record<ModerationStatus, string> = {
  pending: "در حال بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
};

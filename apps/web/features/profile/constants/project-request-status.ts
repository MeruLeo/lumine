import type { ChipProps } from "@heroui/react";

import type { ProjectRequestStatus } from "@/features/projects";

export const PROJECT_REQUEST_STATUS_LABELS: Record<
  ProjectRequestStatus,
  string
> = {
  pendding: "در انتظار بررسی",
  accepted: "تأیید شده",
  rejected: "رد شده",
  expired: "منقضی شده",
};

export const PROJECT_REQUEST_STATUS_COLORS: Record<
  ProjectRequestStatus,
  ChipProps["color"]
> = {
  pendding: "warning",
  accepted: "success",
  rejected: "danger",
  expired: "default",
};

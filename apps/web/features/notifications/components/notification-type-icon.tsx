// web/features/notifications/components/notification-type-icon.tsx

import {
  CircleCheck,
  CircleInfo,
  TriangleExclamation,
} from "@gravity-ui/icons";
import type { NotificationType } from "../types/notifications";

interface NotificationTypeIconProps {
  type: NotificationType | null;
  className?: string;
}

const sharedClassName =
  "flex size-10 shrink-0 items-center justify-center rounded-lg";

export const NotificationTypeIcon = ({
  type,
  className = "",
}: NotificationTypeIconProps) => {
  if (type === "success") {
    return (
      <span
        className={`${sharedClassName} bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ${className}`}
        aria-label="اعلان موفقیت"
      >
        <CircleCheck className="size-5" />
      </span>
    );
  }

  if (type === "warning") {
    return (
      <span
        className={`${sharedClassName} bg-amber-500/10 text-amber-600 dark:text-amber-400 ${className}`}
        aria-label="اعلان هشدار"
      >
        <TriangleExclamation className="size-5" />
      </span>
    );
  }

  return (
    <span
      className={`${sharedClassName} bg-sky-500/10 text-sky-600 dark:text-sky-400 ${className}`}
      aria-label="اعلان اطلاعاتی"
    >
      <CircleInfo className="size-5" />
    </span>
  );
};

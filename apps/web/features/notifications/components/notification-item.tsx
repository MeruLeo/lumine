// web/features/notifications/components/notification-item.tsx

"use client";

import Link from "next/link";
import { Check } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import type { NotificationRecipient } from "../types/notifications";
import { useMarkNotificationRecipientSeen } from "../hooks/mutations/use-mark-notification-recipient-seen";
import { NotificationTypeIcon } from "./notification-type-icon";
import { formatNotificationDate } from "../utils/format-notification-date";

interface NotificationItemProps {
  recipient: NotificationRecipient;
}

function getSenderLabel(recipient: NotificationRecipient): string {
  switch (recipient.notification.typeSender) {
    case "lumine":
      return "لومینه";

    case "user":
      return "کاربر";

    default:
      return "سیستم";
  }
}

export const NotificationItem = ({ recipient }: NotificationItemProps) => {
  const markAsSeenMutation = useMarkNotificationRecipientSeen();

  const handleMarkAsSeen = () => {
    if (recipient.isSeen || markAsSeenMutation.isPending) {
      return;
    }

    markAsSeenMutation.mutate(recipient.id);
  };

  return (
    <article
      className={[
        "relative flex gap-3 rounded-4xl border p-4 transition-colors",
        recipient.isSeen
          ? "border-border bg-card"
          : "border-primary/25 bg-primary/[0.04]",
      ].join(" ")}
    >
      {!recipient.isSeen && (
        <span
          className="absolute right-2 top-2 size-2 rounded-full bg-primary"
          aria-label="خوانده‌نشده"
        />
      )}

      <NotificationTypeIcon type={recipient.notification.typeNotif} />

      <div className="min-w-0 flex-1">
        <Link
          href={`/notifications/${recipient.id}`}
          aria-label={`مشاهده اعلان ${recipient.notification.title}`}
          className="group block focus-visible:outline-none"
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3
                className={[
                  "line-clamp-1 text-sm transition-colors group-hover:text-primary",
                  recipient.isSeen ? "font-medium" : "font-semibold",
                ].join(" ")}
              >
                {recipient.notification.title}
              </h3>

              <time className="shrink-0 text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
                {formatNotificationDate(recipient.created)}
              </time>
            </div>

            <p className="line-clamp-2 text-sm leading-6 text-text-secondary-light dark:text-text-secondary-dark">
              {recipient.notification.message}
            </p>

            <span className="text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
              ارسال‌شده توسط {getSenderLabel(recipient)}
            </span>
          </div>
        </Link>

        {!recipient.isSeen && (
          <div className="mt-3 flex justify-end border-t border-border pt-3">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              isDisabled={markAsSeenMutation.isPending}
              onPress={handleMarkAsSeen}
              aria-label="علامت‌گذاری اعلان به‌عنوان خوانده‌شده"
            >
              <Check className="size-4" />
              {markAsSeenMutation.isPending ? "در حال ثبت..." : "خواندم"}
            </Button>
          </div>
        )}

        {markAsSeenMutation.isError && (
          <p
            role="alert"
            className="mt-2 text-left text-xs text-red-600 dark:text-red-400"
          >
            ثبت وضعیت اعلان انجام نشد.
          </p>
        )}
      </div>
    </article>
  );
};

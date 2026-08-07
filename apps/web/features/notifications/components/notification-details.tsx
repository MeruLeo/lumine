"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Calendar } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useNotificationRecipient } from "../hooks/queries/use-notification-recipient";
import { useMarkNotificationRecipientSeen } from "../hooks/mutations/use-mark-notification-recipient-seen";
import { NotificationTypeIcon } from "./notification-type-icon";
import { NotificationsError } from "./notifications-error";
import { formatNotificationDate } from "../utils/format-notification-date";

interface NotificationDetailsProps {
  notificationRecipientId: number;
}

function getNotificationTypeLabel(
  type: "success" | "warning" | "info" | null,
): string {
  switch (type) {
    case "success":
      return "موفقیت";

    case "warning":
      return "هشدار";

    case "info":
      return "اطلاعات";

    default:
      return "عمومی";
  }
}

function getSenderLabel(senderType: "lumine" | "user" | null): string {
  switch (senderType) {
    case "lumine":
      return "لومینه";

    case "user":
      return "کاربر";

    default:
      return "سیستم";
  }
}

export const NotificationDetails = ({
  notificationRecipientId,
}: NotificationDetailsProps) => {
  const requestedRecipientIdRef = useRef<number | null>(null);

  const notificationQuery = useNotificationRecipient(notificationRecipientId);

  const markAsSeenMutation = useMarkNotificationRecipientSeen();

  const recipient = notificationQuery.data;

  useEffect(() => {
    if (!recipient || recipient.isSeen) {
      return;
    }

    if (requestedRecipientIdRef.current === recipient.id) {
      return;
    }

    requestedRecipientIdRef.current = recipient.id;

    markAsSeenMutation.mutate(recipient.id, {
      onError: () => {
        requestedRecipientIdRef.current = null;
      },
    });
  }, [recipient, markAsSeenMutation.mutate]);

  if (
    !Number.isFinite(notificationRecipientId) ||
    notificationRecipientId <= 0
  ) {
    return (
      <NotificationsError
        error={new Error("شناسه اعلان معتبر نیست.")}
        onRetry={() => window.location.assign("/notifications")}
      />
    );
  }

  if (notificationQuery.isPending) {
    return (
      <section
        className="flex min-h-64 items-center justify-center"
        aria-busy="true"
        aria-label="در حال دریافت جزئیات اعلان"
      >
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          در حال دریافت جزئیات اعلان...
        </p>
      </section>
    );
  }

  if (notificationQuery.isError) {
    return (
      <NotificationsError
        error={notificationQuery.error}
        onRetry={() => notificationQuery.refetch()}
      />
    );
  }

  if (!recipient) {
    return (
      <NotificationsError
        error={new Error("اعلان موردنظر پیدا نشد.")}
        onRetry={() => notificationQuery}
      />
    );
  }

  const notification = recipient.notification;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <span
          className={[
            "rounded-lg px-2.5 py-1 text-xs font-medium",
            recipient.isSeen || markAsSeenMutation.isSuccess
              ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              : "bg-primary/10 text-primary",
          ].join(" ")}
        >
          {recipient.isSeen || markAsSeenMutation.isSuccess
            ? "خوانده‌شده"
            : "جدید"}
        </span>
      </div>

      <article className="rounded-4xl border border-border bg-card p-5 sm:p-6">
        <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start">
          <NotificationTypeIcon type={notification.typeNotif} />

          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold leading-8">
              {notification.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
              <span>
                ارسال‌شده توسط {getSenderLabel(notification.typeSender)}
              </span>

              <span>
                نوع اعلان: {getNotificationTypeLabel(notification.typeNotif)}
              </span>
            </div>
          </div>
        </header>

        <div className="py-6">
          <p className="whitespace-pre-line text-sm leading-8 text-text-secondary-light dark:text-text-secondary-dark">
            {notification.message}
          </p>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="flex items-center gap-2 text-xs text-text-placeholder-light dark:text-text-placeholder-dark">
            <Calendar className="size-4" />
            {formatNotificationDate(notification.createdAt)}
          </span>

          {markAsSeenMutation.isPending && (
            <span
              role="status"
              className="text-xs text-text-placeholder-light dark:text-text-placeholder-dark"
            >
              در حال ثبت وضعیت...
            </span>
          )}

          {markAsSeenMutation.isError && (
            <button
              type="button"
              onClick={() => {
                requestedRecipientIdRef.current = null;
                markAsSeenMutation.mutate(recipient.id);
              }}
              className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400"
            >
              تلاش مجدد برای ثبت وضعیت
            </button>
          )}
        </footer>
      </article>
    </div>
  );
};

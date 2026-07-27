"use client";

import { useState } from "react";
import { Button, Chip, Separator } from "@heroui/react";
import { NotificationItemModel } from "../types/notification";
import {
  formatNotificationDate,
  getNotificationTypeClass,
  getNotificationTypeLabel,
  isNotificationExpired,
} from "../utils/helpers/notification";
import { NotificationMenu } from "./notification-menu";

interface NotificationItemProps {
  notification: NotificationItemModel;
  onSeen?: (id: number) => void;
}

const CHAR_LIMIT = 85;

export function NotificationItem({
  notification,
  onSeen,
}: NotificationItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const unread = notification.recipient?.isSeen === false;
  const expired = isNotificationExpired(notification);

  const message = notification.message || "";
  const isLongMessage = message.length > CHAR_LIMIT;

  const displayedMessage =
    isLongMessage && !isExpanded
      ? `${message.substring(0, CHAR_LIMIT)}...`
      : message;

  return (
    <div
      className={[
        "rounded-4xl p-4 w-[300px] transition-all duration-300 flex flex-col justify-between min-h-[280px]",
        unread
          ? "bg-surface-elevated-light dark:bg-surface-elevated-dark"
          : "bg-card",
        expired ? "opacity-60" : "",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 h-full justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Chip
              className={`${getNotificationTypeClass(notification.type)} size-sm`}
            >
              {getNotificationTypeLabel(notification.type)}
            </Chip>

            {notification.isGlobal && (
              <Chip className="bg-indigo size-sm">عمومی</Chip>
            )}

            {unread && <Chip className="bg-blue size-sm">خوانده نشده</Chip>}

            {expired && (
              <Chip className="bg-surface-elevated-dark size-sm">
                منقضی شده
              </Chip>
            )}
          </div>

          <h3 className="text-lg font-bold line-clamp-1">
            {notification.title}
          </h3>
        </div>

        <div className="flex-grow my-2">
          <p className="text-sm leading-6 text-text-secondary-light dark:text-text-secondary-dark break-words">
            {displayedMessage}
          </p>
          {isLongMessage && (
            <Button size="sm" onPress={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "بستن متن" : "مشاهده بیشتر"}
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <Separator />

          <div className="flex justify-between text-text-secondary-light dark:text-text-secondary-dark items-center text-xs">
            <span className="truncate max-w-[120px]">
              {notification.sender.firstName} {notification.sender.lastName}
            </span>
            <span>{formatNotificationDate(notification.createdAt)}</span>
            <NotificationMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

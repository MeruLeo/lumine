"use client";

import React, { useEffect, useState } from "react";
import {
  Notification as NotificationType,
  NotificationStatus,
} from "@/stores/notification.store";
import { Divider } from "@heroui/divider";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import { UserNotification } from "@/stores/notification.store";
import { useNotification } from "@/hooks/useNotif";
import { TrashIcon } from "@/components/icons/icons";
import DeleteNotifModal from "./DeleteNotifModal";

const statusIcon: Record<NotificationStatus, React.ReactNode> = {
  info: <span>ℹ️</span>,
  success: <span>✅</span>,
  error: <span>❌</span>,
  warning: <span>⚠️</span>,
};

interface Props {
  notification: NotificationType;
}

export const Notification: React.FC<Props> = ({ notification }) => {
  const { getMe, user } = useAuth();
  const { selectedNotification, markAsRead } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getMe();
  }, []);

  const hasSeen = notification.seenBy.some((u) => u._id === user?._id);

  useEffect(() => {
    if (user?.role === "model" && !hasSeen) {
      markAsRead(notification._id);
    }
  }, [user?._id, notification._id]);

  const isPersonal = notification.type === "personal";

  return (
    <>
      <div className="bg-Jet_Black_4 p-4 rounded-[2rem]">
        {/* عنوان و آیکون */}
        <header className="flex justify-between items-start">
          <div className="flex text-3xl gap-2 items-center">
            <span>{statusIcon[notification.status]}</span>
            <h3 className="font-bold =">{notification.title}</h3>
          </div>
          {user?.role === "model" ? null : (
            <Button
              className="text-sm"
              color="danger"
              radius="full"
              variant="light"
              size="sm"
              isIconOnly
              onPress={() => setIsOpen(true)}
            >
              <TrashIcon />
            </Button>
          )}
        </header>

        {/* پیام */}
        <div className="text-xl mt-2 text-zinc-300">{notification.message}</div>

        <Divider className="my-4" />

        {/* اطلاعات نوتیف */}
        <div className="flex flex-wrap gap-2">
          <InfoBadge label="نوع" value={isPersonal ? "شخصی" : "عمومی"} />
          {!isPersonal ? null : (
            <DropdownList
              title="لیست گیرندگان"
              users={notification.recipients}
            />
          )}

          {user?.role !== "model" && (
            <>
              <DropdownList
                title="لیست خوانده‌شده‌ها"
                users={notification.seenBy}
              />
            </>
          )}

          <InfoBadge
            label="تاریخ"
            value={new Date(notification.createdAt).toLocaleString("fa-IR")}
          />
        </div>
      </div>

      <DeleteNotifModal
        isOpen={isOpen}
        onOpenChange={(open) => !open && setIsOpen(false)}
        selectedNotification={notification}
      />
    </>
  );
};

interface InfoBadgeProps {
  label: string;
  value: string;
}

const InfoBadge: React.FC<InfoBadgeProps> = ({ label, value }) => (
  <div className="bg-Jet_Black_2 px-4 py-2 rounded-full text-sm whitespace-nowrap">
    {label}: <b>{value}</b>
  </div>
);

interface DropdownListProps {
  title: string;
  users: UserNotification[];
}

const DropdownList: React.FC<DropdownListProps> = ({ title, users }) => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button
          variant="flat"
          className="bg-Jet_Black_2 rounded-full text-sm px-4"
        >
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={`${title}`}
        className="max-h-60 overflow-y-auto"
      >
        {users.length === 0 ? (
          <DropdownItem key="empty" disabled>
            خالی
          </DropdownItem>
        ) : (
          users.map((user) => (
            <DropdownItem key={user._id}>
              {user.fullName}{" "}
              <span className="text-xs text-gray-400">
                ({user.modelingCode})
              </span>
            </DropdownItem>
          ))
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/stores/notification.store";
import { Notification } from "@/components/inbox/notification/Notification";
import { useAuth } from "@/hooks/useAuth";

export default function InboxPage() {
  const {
    notifications,
    getAllNotificationsForAdmin,
    getUserNotifications,
    loading,
    error,
  } = useNotificationStore();
  const { getMe, user } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "model") getUserNotifications();
    else getAllNotificationsForAdmin();
  }, [user]);

  return (
    <div className="load-page">
      <main className="pt-8 gap-8 flex flex-col w-full">
        {loading && <div>در حال بارگذاری...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="w-full flex flex-col gap-4">
          {notifications.length === 0 && !loading && (
            <div>نوتیفی وجود ندارد.</div>
          )}
          {notifications.map((notif) => (
            <Notification key={notif._id} notification={notif} />
          ))}
        </div>
      </main>
    </div>
  );
}

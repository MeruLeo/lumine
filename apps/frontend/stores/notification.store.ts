import { create } from "zustand";
import { devtools } from "zustand/middleware";

import API from "@/lib/axios";

export type NotificationType = "personal" | "global";
export type NotificationStatus = "info" | "success" | "error" | "warning";

export interface UserNotification {
  _id: string;
  fullName: string;
  modelingCode: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  recipients: UserNotification[];
  seenBy: UserNotification[];
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  selectedNotification: Notification | null;
  loading: boolean;
  error: string | null;

  getAllNotifications: () => Promise<void>;
  getNotificationById: (id: string) => Promise<void>;
  createNotification: (data: {
    title: string;
    message: string;
    type: NotificationType;
    status?: NotificationStatus;
    recipientIds?: string[];
  }) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  getUserNotifications: () => Promise<void>;
  getAllNotificationsForAdmin: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  clearSelected: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  devtools((set) => ({
    notifications: [],
    selectedNotification: null,
    loading: false,
    error: null,

    getAllNotifications: async () => {
      try {
        set({ loading: true, error: null });
        const res = await API.get("/notifs");

        set({ notifications: res.data.notifications });
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Failed to fetch notifications",
        });
      } finally {
        set({ loading: false });
      }
    },

    getNotificationById: async (id: string) => {
      try {
        set({ loading: true, error: null });
        const res = await API.get(`/notifs/${id}`);

        set({ selectedNotification: res.data.notification });
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Failed to fetch notification",
        });
      } finally {
        set({ loading: false });
      }
    },

    createNotification: async ({
      title,
      message,
      type,
      status = "info",
      recipientIds = [],
    }) => {
      try {
        set({ loading: true, error: null });
        const res = await API.post("/notifs", {
          title,
          message,
          type,
          status,
          recipientIds,
        });

        set((state) => ({
          notifications: [res.data.notification, ...state.notifications],
        }));
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Failed to create notification",
        });
      } finally {
        set({ loading: false });
      }
    },

    deleteNotification: async (id: string) => {
      try {
        set({ loading: true, error: null });
        console.log(id);
        await API.delete(`/notifs/${id}`);
        set((state) => ({
          notifications: state.notifications.filter((n) => n._id !== id),
        }));
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Failed to delete notification",
        });
      } finally {
        set({ loading: false });
      }
    },

    markAsRead: async (id: string) => {
      try {
        await API.patch(`/notifs/${id}/read`);
        const userId = "CURRENT_USER_ID";

        set((state) => ({
          notifications: state.notifications.map((n) =>
            n._id === id && !n.seenBy.includes(userId)
              ? { ...n, seenBy: [...n.seenBy, userId] }
              : n,
          ),
        }));
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Failed to mark as read" });
      }
    },

    getUserNotifications: async () => {
      try {
        set({ loading: true, error: null });
        const res = await API.get("/notifs");

        set({ notifications: res.data.notifications });
      } catch (err: any) {
        set({
          error:
            err.response?.data?.message || "Failed to fetch user notifications",
        });
      } finally {
        set({ loading: false });
      }
    },

    getAllNotificationsForAdmin: async () => {
      try {
        set({ loading: true, error: null });
        const res = await API.get("/notifs/admin");

        set({ notifications: res.data.notifications });
      } catch (err: any) {
        set({
          error:
            err.response?.data?.message ||
            "Failed to fetch admin notifications",
        });
      } finally {
        set({ loading: false });
      }
    },

    clearSelected: () => set({ selectedNotification: null }),
  })),
);

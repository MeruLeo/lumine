import { useNotificationStore } from "@/stores/notification.store";

export const useNotification = () => {
  const {
    notifications,
    selectedNotification,
    error,
    loading,
    createNotification,
    clearSelected,
    deleteNotification,
    getAllNotifications,
    getAllNotificationsForAdmin,
    getNotificationById,
    getUserNotifications,
    markAsRead,
    getPersonalNotifications,
    getGlobalNotifications,
  } = useNotificationStore();

  return {
    notifications,
    selectedNotification,
    error,
    loading,
    createNotification,
    clearSelected,
    deleteNotification,
    getAllNotifications,
    getAllNotificationsForAdmin,
    getNotificationById,
    getUserNotifications,
    markAsRead,
    getPersonalNotifications,
    getGlobalNotifications,
  };
};

import { create } from "zustand";

import axios from "@/lib/axios";
import { UserType } from "@/types/users";
import API from "@/lib/axios";

interface UserStore {
  users: UserType[];
  selectedUser: UserType | null;
  me: UserType | null;
  loading: boolean;
  error: string | null;

  getAllUsers: () => Promise<void>;
  getUserById: (id: string) => Promise<void>;
  getMe: () => Promise<void>;
  createUser: (data: Partial<UserType>) => Promise<void>;
  updateUserById: (id: string, data: Partial<UserType>) => Promise<void>;
  changeUserStatus: (
    userId: string,
    status: "pending" | "accepted" | "rejected",
  ) => Promise<void>;
  deleteUserById: (id: string) => Promise<void>;
  verifyUser: (id: string) => Promise<void>;

  clearError: () => void;
  clearSelectedUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,
  me: null,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),
  clearSelectedUser: () => set({ selectedUser: null }),

  getAllUsers: async () => {
    try {
      set({ loading: true, error: null });
      const res = await API.get("/users");

      set({ users: res.data.data.users });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "خطا در دریافت کاربران" });
    } finally {
      set({ loading: false });
    }
  },

  getUserById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const res = await API.get(`/users/${id}`);
      set({ selectedUser: res.data });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "کاربر پیدا نشد" });
    } finally {
      set({ loading: false });
    }
  },

  getMe: async () => {
    try {
      set({ loading: true, error: null });
      const res = await API.get("/users/me");
      set({ me: res.data.user });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "احراز هویت انجام نشد" });
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await API.post("/users", data);
      set((state) => ({ users: [...state.users, res.data.newUser] }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "خطا در ساخت کاربر" });
    } finally {
      set({ loading: false });
    }
  },

  updateUserById: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const res = await API.put(`/users/${id}`, data);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? res.data.updatedUser : user,
        ),
        selectedUser: res.data.updatedUser,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "خطا در بروزرسانی کاربر" });
    } finally {
      set({ loading: false });
    }
  },

  changeUserStatus: async (userId, status) => {
    try {
      set({ loading: true, error: null });
      const res = await API.put(`/users/status/${userId}`, { status });

      set((state) => ({
        users: state.users.map((user) =>
          user._id === userId ? { ...user, status: res.data.status } : user,
        ),
        selectedUser:
          state.selectedUser && state.selectedUser._id === userId
            ? { ...state.selectedUser, status: res.data.status }
            : state.selectedUser,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "خطا در تغییر وضعیت کاربر" });
    } finally {
      set({ loading: false });
    }
  },

  deleteUserById: async (id) => {
    try {
      set({ loading: true, error: null });
      await API.delete(`/users/${id}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== id),
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "خطا در حذف کاربر" });
    } finally {
      set({ loading: false });
    }
  },

  verifyUser: async (id) => {
    try {
      set({ loading: true, error: null });
      const res = await API.patch(`/users/verify/${id}`);
      set((state) => ({
        users: state.users.map((user) =>
          user._id === id ? res.data.user : user,
        ),
        selectedUser: res.data.user,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || "تأیید کاربر ناموفق بود" });
    } finally {
      set({ loading: false });
    }
  },
}));

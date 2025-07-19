import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { UserType } from "../types/users";

import API from "@/lib/axios";

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  success: boolean;
  error: string | null;

  login: (data: { phone: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getMe: () => Promise<void>;
  sendEmailVerificationCode: (data: { email: string }) => Promise<void>;
  verifyEmailCode: (data: { email: string; code: string }) => Promise<void>;
  forgetPassword: (data: { email: string }) => Promise<void>;
  verifyPasswordCode: (data: { email: string; code: string }) => Promise<void>;
  resetPassword: (data: {
    email: string;
    newPassword: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    success: false,
    error: null,

    login: async ({ phone, password }) => {
      set({ isLoading: true, error: null, success: false });
      try {
        const res = await API.post("/auth/login", { phone, password });

        set({
          user: res.data.user,
          isAuthenticated: true,
          success: true,
        });

        return res;
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "خطا در لاگین",
          success: false,
        });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    register: async (data) => {
      set({ isLoading: true, error: null, success: false });
      try {
        const res = await API.post("/auth/register", data);

        set({
          user: res.data.user,
          success: true,
        });

        return res;
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "خطا در ثبت فرم",
          success: false,
        });
      } finally {
        set({ isLoading: false });
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await API.post("/auth/logout");
        set({ user: null, isAuthenticated: false });
      } catch (err: any) {
        set({ error: err.response?.data?.message || "خطا در خروج" });
      } finally {
        set({ isLoading: false });
      }
    },

    checkAuth: async () => {
      set({ isLoading: true });
      try {
        await useAuthStore.getState().refreshToken();
      } catch {
        set({ user: null, isAuthenticated: false });
      } finally {
        set({ isLoading: false });
      }
    },

    getMe: async () => {
      try {
        set({ isLoading: true, error: null });
        const response = await API.get("/users/me", {
          withCredentials: true,
        });

        const user = response.data.data.user;

        set({ user, isAuthenticated: true, success: true });
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "خطا در دریافت اطلاعات کاربر",
          isAuthenticated: false,
          user: null,
        });
      } finally {
        set({ isLoading: false });
      }
    },

    sendEmailVerificationCode: async ({ email }) => {
      set({ isLoading: true, error: null });
      try {
        const res = await API.post("/auth/send-verification-code", { email });

        set({
          success: true,
        });

        return res;
      } catch (err) {
        set({ error: "خطا در ارسال کد تایید" });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    verifyEmailCode: async ({ email, code }) => {
      set({ isLoading: true, error: null });
      try {
        const res = await API.post("/auth/verify-code", { email, code });

        set({
          success: true,
        });

        return res.data;
      } catch (err) {
        set({ error: "خطا در تایید ایمیل" });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    refreshToken: async () => {
      try {
        await API.post("/auth/refresh-token");

        const userRes = await API.get("/user/me");

        set({ user: userRes.data, isAuthenticated: true });
      } catch (err: any) {
        set({ error: "Token refresh failed", isAuthenticated: false });
        throw err;
      }
    },

    forgetPassword: async ({ email }) => {
      set({ isLoading: true, error: null });
      try {
        const res = await API.post("/auth/forget-password", { email });

        set({
          success: true,
        });

        return res;
      } catch (err) {
        set({ error: "خطا در ارسال کد تایید" });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    verifyPasswordCode: async ({ email, code }) => {
      set({ isLoading: true, error: null });
      try {
        const res = await API.post("/auth/verify-password-code", {
          email,
          code,
        });

        set({
          success: true,
        });

        return res.data;
      } catch (err) {
        set({ error: "خطا در تایید ایمیل" });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    resetPassword: async ({ email, newPassword }) => {
      set({ isLoading: true, error: null });
      try {
        const res = await API.post("/auth/reset-password", {
          email,
          newPassword,
        });

        set({
          success: true,
        });

        return res.data;
      } catch (err) {
        set({ error: "خطا در بازنشانی رمزعبور" });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);

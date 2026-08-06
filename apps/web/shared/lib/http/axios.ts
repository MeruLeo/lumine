import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

import { tokenService } from "./token-service";
import { useAuthStore } from "@/features/auth/store/auth_1";

// ─── Types ──────────────────────────────────────────────────

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

type AuthMode = "registration" | "access";

type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _authMode?: AuthMode;
};

// ─── Endpoint Categories ────────────────────────────────────

const PUBLIC_ENDPOINTS = ["/auth/send-otp/", "/auth/verify-otp/"];

const REGISTRATION_ENDPOINTS = [
  "/auth/basic-info/",
  "/auth/technical-info/",
  "/auth/work-info/",
  "/auth/portfolio/",
  "/auth/set-role/",
  "/auth/p-category/",
];

const DUAL_AUTH_ENDPOINTS = ["/auth/categories"];

// ─── Endpoint Helpers ───────────────────────────────────────

function isPublicEndpoint(url: string): boolean {
  return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

function isRegistrationEndpoint(url: string): boolean {
  return REGISTRATION_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

function isDualAuthEndpoint(url: string): boolean {
  return DUAL_AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));
}

// ─── Axios Instance ─────────────────────────────────────────

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// ─── Request Interceptor ───────────────────────────────────

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.headers?.["X-Skip-Interceptor"]) {
      delete config.headers["X-Skip-Interceptor"];

      return config;
    }

    const url = config.url ?? "";

    if (isPublicEndpoint(url)) {
      return config;
    }

    const registrationUserToken =
      useAuthStore.getState().registration.userToken;

    if (isRegistrationEndpoint(url)) {
      if (!registrationUserToken) {
        safeRedirect("/auth");

        return Promise.reject({
          message: "User token required for registration",
          status: 401,
        });
      }

      config.headers.token = registrationUserToken;

      (config as CustomAxiosRequestConfig)._authMode = "registration";

      return config;
    }

    if (isDualAuthEndpoint(url)) {
      if (registrationUserToken) {
        config.headers.token = registrationUserToken;

        (config as CustomAxiosRequestConfig)._authMode = "registration";

        return config;
      }

      let accessToken = tokenService.getAccessToken();

      if (!accessToken && tokenService.getRefreshToken()) {
        try {
          accessToken = await tokenService.refreshAccessToken();

          updateAuthenticatedUser(accessToken);
        } catch {
          safeRedirect("/auth");

          return Promise.reject({
            message: "Access token required",
            status: 401,
          });
        }
      }

      if (!accessToken) {
        safeRedirect("/auth");

        return Promise.reject({
          message: "Access token required",
          status: 401,
        });
      }

      config.headers.Authorization = `Bearer ${accessToken}`;

      (config as CustomAxiosRequestConfig)._authMode = "access";

      return config;
    }

    let accessToken = tokenService.getAccessToken();

    if (!accessToken && tokenService.getRefreshToken()) {
      try {
        accessToken = await tokenService.refreshAccessToken();

        updateAuthenticatedUser(accessToken);
      } catch {
        safeRedirect("/auth");

        return Promise.reject({
          message: "Access token required",
          status: 401,
        });
      }
    }

    if (!accessToken) {
      safeRedirect("/auth");

      return Promise.reject({
        message: "Access token required",
        status: 401,
      });
    }

    config.headers.Authorization = `Bearer ${accessToken}`;

    (config as CustomAxiosRequestConfig)._authMode = "access";

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ───────────────────────────────────

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token as string);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config as
      | CustomAxiosRequestConfig
      | undefined;

    const status = error.response?.status;

    // ─── Handle 401 Unauthorized ────────────────────────────

    if (status === 401 && originalRequest && !originalRequest._retry) {
      if (originalRequest.url?.includes("/auth/refresh-token/")) {
        useAuthStore.getState().resetAuth();
        safeRedirect("/auth");

        return Promise.reject(error);
      }

      const isRegistrationRequest = isRegistrationEndpoint(
        originalRequest.url ?? "",
      );

      if (
        isRegistrationRequest ||
        originalRequest._authMode === "registration"
      ) {
        useAuthStore.getState().clearRegistration();
        safeRedirect("/auth");

        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axiosInstance(originalRequest);
          })
          .catch((refreshError) => {
            return Promise.reject(refreshError);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await tokenService.refreshAccessToken();

        updateAuthenticatedUser(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        useAuthStore.getState().resetAuth();
        safeRedirect("/auth");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ─── Handle 403 Forbidden ───────────────────────────────

    if (status === 403) {
      useAuthStore.getState().resetAuth();
      safeRedirect("/auth");

      return Promise.reject(error);
    }

    // ─── Normalize Error ────────────────────────────────────

    const message =
      error.response?.data?.message || error.message || "خطایی رخ داده است";

    const normalized: ApiError = {
      message,
      status,
      data: error.response?.data,
    };

    return Promise.reject(normalized);
  },
);

// ─── Helpers ────────────────────────────────────────────────

function updateAuthenticatedUser(accessToken: string): void {
  const currentState = useAuthStore.getState();

  if (
    !currentState.authenticated ||
    currentState.authenticated.status !== "accept"
  ) {
    currentState.setAuthenticatedUser("accept", accessToken);
  }
}

let isRedirecting = false;

function safeRedirect(path: string): void {
  if (typeof window === "undefined") {
    return;
  }

  if (isRedirecting) {
    return;
  }

  if (window.location.pathname === path) {
    return;
  }

  isRedirecting = true;

  window.location.replace(path);
}

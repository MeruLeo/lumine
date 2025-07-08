import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/v1",
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;
      try {
        await API.post("/auth/refresh-token");

        return API(originalRequest); // تلاش مجدد با توکن جدید
      } catch (err) {
        console.error("Refresh token failed:", err);
      }
    }

    return Promise.reject(error);
  },
);

export default API;

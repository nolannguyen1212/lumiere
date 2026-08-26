import axios from "axios";
import { cookies } from "./cookies";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
});

http.interceptors.request.use((config) => {
  const token = cookies.get("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const REFRESH_URL = "/api/users/token/refresh";

let refreshPromise: Promise<string> | null = null;

const forceLogout = () => {
  cookies.remove("access-token", { path: "/" });
  cookies.remove("refresh-token", { path: "/" });
  cookies.set("isLoggedIn", false, { path: "/" });
  window.location.href = "/login";
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry || originalRequest.url === REFRESH_URL) {
      return Promise.reject(error);
    }

    const refreshToken = cookies.get("refresh-token");
    if (!refreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= http
        .post<{ access: string }>(REFRESH_URL, { refresh: refreshToken })
        .then((response) => response.data.access)
        .finally(() => {
          refreshPromise = null;
        });

      const accessToken = await refreshPromise;
      cookies.set("access-token", accessToken, { path: "/", secure: true });
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return http(originalRequest);
    } catch (refreshError) {
      forceLogout();
      return Promise.reject(refreshError);
    }
  },
);

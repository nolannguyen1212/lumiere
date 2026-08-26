import { http } from "../lib/http";
import { Notification } from "../type";

export interface NotificationListResponse {
  notifications: Notification[];
  unread_count: number;
}

export const fetchNotifications = () =>
  http.get<NotificationListResponse>("/api/notifications").then((response) => response.data);

export const markNotificationsRead = () => http.post<void>("/api/notifications/read").then((response) => response.data);

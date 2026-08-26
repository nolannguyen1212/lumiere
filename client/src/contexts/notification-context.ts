import { createContext } from "react";
import { Notification } from "../type";

export interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

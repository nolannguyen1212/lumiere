import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { fetchNotifications, markNotificationsRead } from "../api/notifications";
import { useLogin } from "../hooks/useLogin";
import { Notification } from "../type";
import { NotificationContext } from "./notification-context";

const RECONNECT_DELAY_MS = 3000;

const socketUrl = (token: string) => {
  const apiRoot = import.meta.env.VITE_API_ROOT as string;
  const wsRoot = apiRoot.replace(/^http/, "ws");
  return `${wsRoot}/ws/notifications/?token=${token}`;
};

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useLogin();
  const [cookies] = useCookies(["access-token"]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const markAllRead = () => {
    if (unreadCount === 0) {
      return;
    }
    markNotificationsRead()
      .then(() => {
        setUnreadCount(0);
        setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
      })
      .catch((error) => console.error("Failed to mark notifications read:", error));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    fetchNotifications()
      .then((data) => {
        setNotifications(data.notifications);
        setUnreadCount(data.unread_count);
      })
      .catch((error) => console.error("Failed to fetch notifications:", error));
  }, [isLoggedIn]);

  const token = cookies["access-token"];

  useEffect(() => {
    if (!isLoggedIn || !token) {
      return;
    }

    let socket: WebSocket;
    let stopped = false;

    const connect = () => {
      if (stopped) {
        return;
      }

      socket = new WebSocket(socketUrl(token));

      socket.onmessage = (event) => {
        const notification = JSON.parse(event.data) as Notification;
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((count) => count + 1);
      };

      socket.onclose = () => {
        if (!stopped) {
          reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };
    };

    connect();

    return () => {
      stopped = true;
      clearTimeout(reconnectTimeoutRef.current);
      socket.close();
    };
  }, [isLoggedIn, token]);

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

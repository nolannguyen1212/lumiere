import { http } from "../lib/http";
import { Order } from "../type";

export const completeCurrentOrder = () =>
  http.put<{ message: string }>("/api/orders").then((response) => response.data);

export const fetchOrders = () => http.get<{ orders: Order[] }>("/api/orders").then((response) => response.data.orders);

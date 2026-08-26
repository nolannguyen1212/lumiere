import { http } from "../lib/http";
import { OrderItem } from "../type";

export const fetchOrderItems = () =>
  http.get<{ order_items: OrderItem[] }>("/api/order-items").then((response) => response.data.order_items);

export const addOrderItem = (menuItemId: string) =>
  http.post<{ message: string }>("/api/order-items", { menu_item_id: menuItemId }).then((response) => response.data);

export const updateOrderItemQuantity = (id: string, quantity: number) =>
  http.put<{ message: string }>("/api/order-items", { id, quantity }).then((response) => response.data);

export const deleteOrderItem = (id: string) =>
  http.delete<{ message: string }>("/api/order-items", { data: { id } }).then((response) => response.data);

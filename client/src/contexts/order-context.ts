import { createContext, Dispatch, SetStateAction } from "react";
import { OrderItem } from "../type";

export interface OrderContextValue {
  orderItems: OrderItem[];
  setOrderItems: Dispatch<SetStateAction<OrderItem[]>>;
  refreshOrderItems: () => void;
}

export const OrderContext = createContext<OrderContextValue | null>(null);

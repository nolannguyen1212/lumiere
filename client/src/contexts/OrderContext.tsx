import { PropsWithChildren, useEffect, useState } from "react";
import { fetchOrderItems } from "../api/orderItems";
import { useLogin } from "../hooks/useLogin";
import { OrderItem } from "../type";
import { OrderContext } from "./order-context";

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useLogin();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [refreshCount, setRefreshCount] = useState(0);

  const refreshOrderItems = () => setRefreshCount((count) => count + 1);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    fetchOrderItems()
      .then(setOrderItems)
      .catch((error) => console.error("Failed to fetch order items:", error));
  }, [isLoggedIn, refreshCount]);

  return (
    <OrderContext.Provider value={{ orderItems, setOrderItems, refreshOrderItems }}>
      {children}
    </OrderContext.Provider>
  );
};

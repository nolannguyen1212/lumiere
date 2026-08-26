import { OrderItem } from "../type";

const TAX_RATE = 0.1;

export interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}

export const computeCartTotals = (orderItems: OrderItem[]): CartTotals => {
  const subtotal = orderItems.reduce((sum, item) => sum + item.total_price, 0);
  const tax = subtotal * TAX_RATE;
  return { subtotal, tax, total: subtotal + tax };
};

export const TAX_RATE_PERCENT = TAX_RATE * 100;

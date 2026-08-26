import { http } from "../lib/http";

export const createPaymentIntent = (orderId: string) =>
  http
    .post<{ client_secret: string }>("/payment/create-checkout-session", { order_id: orderId })
    .then((response) => response.data);

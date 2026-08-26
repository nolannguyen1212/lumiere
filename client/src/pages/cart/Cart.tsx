import { Button, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TablePrice } from "../../components/Cart/TablePrice";
import { CheckoutForm } from "../forms/CheckoutForm";
import { createPaymentIntent } from "../../api/payments";
import { computeCartTotals, TAX_RATE_PERCENT } from "../../lib/cart";
import { useOrder } from "../../hooks/useOrder";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export const Cart = () => {
  const { orderItems } = useOrder();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const { subtotal, tax, total } = computeCartTotals(orderItems);

  const handleSetPaymentSuccess = () => {
    navigate("/");
  };

  const handleClick = async () => {
    if (!total) {
      toast.error("Cart Is Empty!");
      return;
    }

    const orderId = orderItems[0]?.order;
    if (!orderId) {
      toast.error("Cart Is Empty!");
      return;
    }

    try {
      const { client_secret } = await createPaymentIntent(orderId);
      setClientSecret(client_secret);
    } catch {
      toast.error("Payment failed!");
    }
  };

  if (clientSecret) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 6 } }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Checkout
        </Typography>
        <Elements options={{ clientSecret, appearance: { theme: "stripe" } }} stripe={stripePromise}>
          <CheckoutForm handleSetPaymentSuccess={handleSetPaymentSuccess} />
        </Elements>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Order
      </Typography>

      {orderItems.length === 0 ? (
        <TablePrice />
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <TablePrice />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 }, position: { md: "sticky" }, top: { md: 96 } }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                </Stack>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Tax ({TAX_RATE_PERCENT.toFixed(0)}%)
                  </Typography>
                  <Typography variant="body2">${tax.toFixed(2)}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    Total
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "secondary.dark" }}>
                    ${total.toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>
              <Button
                variant="contained"
                size="large"
                fullWidth
                endIcon={<Send />}
                onClick={handleClick}
                sx={{ mt: 3 }}
              >
                Proceed to Payment
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

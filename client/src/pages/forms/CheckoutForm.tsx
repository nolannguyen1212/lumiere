import { FormEvent, useState } from "react";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Avatar, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { completeCurrentOrder } from "../../api/orders";
import { computeCartTotals, TAX_RATE_PERCENT } from "../../lib/cart";
import { useOrder } from "../../hooks/useOrder";
import { PLACEHOLDER_IMAGE } from "../../lib/placeholderImage";

interface CheckoutFormProps {
  handleSetPaymentSuccess: () => void;
}

export const CheckoutForm = ({ handleSetPaymentSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { orderItems, refreshOrderItems } = useOrder();

  const { subtotal, tax, total } = computeCartTotals(orderItems);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (!result.error) {
      toast.success("Checkout Success");
      await completeCurrentOrder();
      refreshOrderItems();
      handleSetPaymentSuccess();
    }

    setIsLoading(false);
  };

  return (
    <Grid container spacing={4} component="form" onSubmit={handleSubmit}>
      <Grid size={{ xs: 12, md: 7 }}>
        <Stack spacing={3}>
          <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Delivery Details
            </Typography>
            <AddressElement options={{ mode: "shipping", allowedCountries: ["US", "VN"] }} />
          </Paper>
          <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Payment
            </Typography>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
          </Paper>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 5 }}>
        <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 }, position: { md: "sticky" }, top: { md: 96 } }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            {orderItems.map((item) => (
              <Stack key={item.id} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Avatar
                  variant="rounded"
                  src={item.image_upload_url || PLACEHOLDER_IMAGE}
                  alt={item.name}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                  {item.name} × {item.quantity}
                </Typography>
                <Typography variant="body2">${item.total_price.toFixed(2)}</Typography>
              </Stack>
            ))}
          </Stack>
          <Divider sx={{ mb: 2 }} />
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
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isLoading || !stripe || !elements}
            sx={{ mt: 3 }}
          >
            {isLoading ? "Processing…" : "Pay Now"}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

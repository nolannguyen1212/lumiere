import { Add, Close, Remove, ShoppingBag } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Link as MuiLink, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteOrderItem, updateOrderItemQuantity } from "../../api/orderItems";
import { useOrder } from "../../hooks/useOrder";
import { PLACEHOLDER_IMAGE } from "../../lib/placeholderImage";
import { truncate } from "../../utilities/truncate";

interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

const QuantityStepper = ({ quantity, onChange }: QuantityStepperProps) => (
  <Stack direction="row" sx={{ alignItems: "center", border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
    <IconButton size="small" aria-label="Decrease quantity" onClick={() => onChange(quantity - 1)}>
      <Remove fontSize="small" />
    </IconButton>
    <Typography sx={{ minWidth: 24, textAlign: "center" }}>{quantity}</Typography>
    <IconButton size="small" aria-label="Increase quantity" onClick={() => onChange(quantity + 1)}>
      <Add fontSize="small" />
    </IconButton>
  </Stack>
);

export const TablePrice = () => {
  const { orderItems, refreshOrderItems } = useOrder();

  const handleChangeQuantity = async (orderItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await deleteOrderItem(orderItemId);
      } else {
        await updateOrderItemQuantity(orderItemId, quantity);
      }
      refreshOrderItems();
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  };

  const handleRemove = async (orderItemId: string) => {
    try {
      await deleteOrderItem(orderItemId);
      refreshOrderItems();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (orderItems.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: { xs: 4, sm: 6 }, textAlign: "center" }}>
        <ShoppingBag sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Your order is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Browse our menu and add a dish you like.
        </Typography>
        <MuiLink component={Link} to="/menu" underline="none">
          <Typography sx={{ fontWeight: 700, color: "secondary.dark" }}>View Menu</Typography>
        </MuiLink>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined">
      {orderItems.map((orderItem, index) => (
        <Box key={orderItem.id}>
          <Stack spacing={1.5} sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar
                variant="rounded"
                src={orderItem.image_upload_url || PLACEHOLDER_IMAGE}
                alt={orderItem.name}
                sx={{ width: 64, height: 64 }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }}>{truncate(orderItem.name, 45)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${orderItem.unit_price} each
                </Typography>
              </Box>

              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <QuantityStepper
                  quantity={orderItem.quantity}
                  onChange={(quantity) => handleChangeQuantity(orderItem.id, quantity)}
                />
              </Box>

              <Typography
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: 700,
                  color: "secondary.dark",
                  minWidth: 72,
                  textAlign: "right",
                }}
              >
                ${orderItem.total_price.toFixed(2)}
              </Typography>

              <IconButton
                size="small"
                aria-label="Remove item"
                onClick={() => handleRemove(orderItem.id)}
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <Close fontSize="small" />
              </IconButton>
            </Stack>

            <Stack
              direction="row"
              sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center", justifyContent: "space-between", pl: "80px" }}
            >
              <QuantityStepper
                quantity={orderItem.quantity}
                onChange={(quantity) => handleChangeQuantity(orderItem.id, quantity)}
              />
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <Typography sx={{ fontWeight: 700, color: "secondary.dark" }}>
                  ${orderItem.total_price.toFixed(2)}
                </Typography>
                <IconButton size="small" aria-label="Remove item" onClick={() => handleRemove(orderItem.id)}>
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
          {index < orderItems.length - 1 && <Divider />}
        </Box>
      ))}
    </Paper>
  );
};

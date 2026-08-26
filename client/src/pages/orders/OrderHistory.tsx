import { Receipt } from "@mui/icons-material";
import { Avatar, Box, Chip, Container, Divider, Link as MuiLink, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../api/orders";
import { PLACEHOLDER_IMAGE } from "../../lib/placeholderImage";
import { Order } from "../../type";
import { shortId } from "../../utilities/shortId";

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders().then((data) => setOrders(data.filter((order) => order.complete)));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Paper variant="outlined" sx={{ p: { xs: 4, sm: 6 }, textAlign: "center" }}>
          <Receipt sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            No past orders yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Orders you complete will show up here.
          </Typography>
          <MuiLink component={Link} to="/menu" underline="none">
            <Typography sx={{ fontWeight: 700, color: "secondary.dark" }}>View Menu</Typography>
          </MuiLink>
        </Paper>
      ) : (
        <Stack spacing={3}>
          {orders.map((order) => (
            <Paper key={order.id} variant="outlined">
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center", p: { xs: 2, sm: 3 } }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>Order #{shortId(order.id)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.formatted_date_ordered}
                  </Typography>
                </Box>
                <Chip label="Completed" color="success" size="small" />
              </Stack>
              <Divider />
              <Stack spacing={2} sx={{ p: { xs: 2, sm: 3 } }}>
                {order.items.map((item) => (
                  <Stack key={item.id} direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Avatar
                      variant="rounded"
                      src={item.image_upload_url || PLACEHOLDER_IMAGE}
                      alt={item.name}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${item.unit_price} × {item.quantity}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ${item.total_price.toFixed(2)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Divider />
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", p: { xs: 2, sm: 3 } }}>
                <Typography sx={{ fontWeight: 800 }}>Total</Typography>
                <Typography sx={{ fontWeight: 800, color: "secondary.dark" }}>${order.total.toFixed(2)}</Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
};

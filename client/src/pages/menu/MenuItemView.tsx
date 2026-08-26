import { Box, Button, Chip, Container, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMenuItem } from "../../api/menu";
import { useAddToCart } from "../../hooks/useAddToCart";
import { PLACEHOLDER_IMAGE } from "../../lib/placeholderImage";
import { MenuItem } from "../../type";
import { MarkdownComponent } from "../../utilities/markdown";
import { parseDescription } from "../../utilities/parser";

export const MenuItemView = () => {
  const { menuItemId } = useParams();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [description, setDescription] = useState<string[]>([]);
  const addToCart = useAddToCart();

  useEffect(() => {
    if (!menuItemId) {
      return;
    }

    fetchMenuItem(menuItemId).then((fetchedMenuItem) => {
      setMenuItem(fetchedMenuItem);
      setDescription(parseDescription(fetchedMenuItem.description));
    });
  }, [menuItemId]);

  if (!menuItem) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 } }}>
      <Grid container spacing={{ xs: 3, md: 6 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            component="img"
            src={menuItem.image_upload_url || PLACEHOLDER_IMAGE}
            alt={menuItem.name}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = PLACEHOLDER_IMAGE;
            }}
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="overline" color="secondary.dark">
            {menuItem.category}
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {menuItem.name}
          </Typography>
          <Chip
            label={menuItem.available ? "Available" : "Sold Out"}
            color={menuItem.available ? "success" : "error"}
            size="small"
            sx={{ mb: 2 }}
          />
          <Typography variant="h4" sx={{ color: "secondary.dark", mb: 3 }}>
            ${menuItem.price}
          </Typography>
          <Button
            size="large"
            variant="contained"
            disabled={!menuItem.available}
            onClick={() => addToCart(menuItem)}
            sx={{ mb: 3, width: { xs: "100%", sm: "auto" } }}
          >
            {menuItem.available ? "Add to Order" : "Unavailable"}
          </Button>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Description
          </Typography>
          <MarkdownComponent markdownContents={description} />
        </Grid>
      </Grid>
    </Container>
  );
};

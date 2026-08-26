import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMenuItems } from "../../api/menu";
import { useAddToCart } from "../../hooks/useAddToCart";
import { PLACEHOLDER_IMAGE } from "../../lib/placeholderImage";
import { MenuItem } from "../../type";
import { truncate } from "../../utilities/truncate";

interface MenuGridProps {
  pageSize: number;
  isChefSpecial?: boolean;
  category?: string;
  name?: string;
}

export const MenuGrid = ({ pageSize, isChefSpecial, category, name }: MenuGridProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[] | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({ isChefSpecial, category, name });
  const addToCart = useAddToCart();

  if (
    appliedFilters.isChefSpecial !== isChefSpecial ||
    appliedFilters.category !== category ||
    appliedFilters.name !== name
  ) {
    setAppliedFilters({ isChefSpecial, category, name });
    setCurrentPage(1);
  }

  useEffect(() => {
    fetchMenuItems({ page: currentPage, isChefSpecial, category, name })
      .then((data) => {
        setMenuItems(data.results);
        setPageCount(Math.max(1, Math.ceil(data.count / pageSize)));
      })
      .catch((error) => console.error("Failed to fetch menu items:", error));
  }, [currentPage, isChefSpecial, category, name, pageSize]);

  if (!menuItems) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (menuItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="body1" color="text.secondary">
          No dishes found.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {menuItems.map((menuItem) => (
          <Grid key={menuItem.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea component={Link} to={`/menu/${menuItem.id}`} sx={{ position: "relative" }}>
                {menuItem.is_chef_special && (
                  <Chip
                    label="Chef's Special"
                    color="secondary"
                    size="small"
                    sx={{ position: "absolute", top: 8, left: 8, zIndex: 1 }}
                  />
                )}
                <CardMedia
                  component="img"
                  image={menuItem.image_upload_url || PLACEHOLDER_IMAGE}
                  alt={menuItem.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                  sx={{ aspectRatio: "1 / 1", objectFit: "cover", bgcolor: "background.default" }}
                />
              </CardActionArea>
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography
                  component={Link}
                  to={`/menu/${menuItem.id}`}
                  variant="subtitle1"
                  sx={{ color: "text.primary", fontWeight: 700, textDecoration: "none", display: "block", mb: 0.5 }}
                >
                  {truncate(menuItem.name)}
                </Typography>
                <Typography variant="body1" sx={{ color: "secondary.dark", fontWeight: 700 }}>
                  ${menuItem.price}
                </Typography>
              </CardContent>
              <Stack sx={{ p: 2, pt: 0 }}>
                <Button
                  size="medium"
                  variant="contained"
                  disabled={!menuItem.available}
                  onClick={() => addToCart(menuItem)}
                >
                  {menuItem.available ? "Add to Order" : "Unavailable"}
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 3, sm: 4 } }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          color="secondary"
          size="large"
          onChange={(_event, page) => setCurrentPage(page)}
        />
      </Box>
    </>
  );
};

import { Box, Container, Divider, Typography } from "@mui/material";
import { MenuGrid } from "../../components/MenuGrid/MenuGrid";

export const ChefSpecials = () => (
  <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography variant="overline" color="secondary.dark">
        Curated by our chef
      </Typography>
      <Typography variant="h4">Chef&apos;s Specials</Typography>
      <Divider sx={{ width: 60, borderColor: "secondary.main", borderBottomWidth: 2, mx: "auto", mt: 2 }} />
    </Box>
    <MenuGrid pageSize={5} isChefSpecial />
  </Container>
);

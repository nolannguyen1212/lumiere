import { Box, Container, Divider, Grid, Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { categoryPath, MENU_CATEGORIES } from "../../constants/menuCategories";
import { ContactInfo } from "./ContactInfo";

const guestServices = ["Reservations", "Private Events", "Gift Cards", "Contact Us"];
const aboutUs = ["Our Story", "The Chef", "Careers", "Press"];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const renderLinkList = (items: string[], to: string) => (
    <Stack spacing={1}>
      {items.map((item) => (
        <MuiLink
          key={item}
          component={Link}
          to={to}
          variant="body2"
          underline="hover"
          sx={{ color: "grey.400", "&:hover": { color: "secondary.light" } }}
        >
          {item}
        </MuiLink>
      ))}
    </Stack>
  );

  return (
    <Box component="footer" sx={{ mt: 8, bgcolor: "primary.main", color: "primary.contrastText" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Guest Services
            </Typography>
            {renderLinkList(guestServices, "/contact")}
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Menu
            </Typography>
            <Stack spacing={1}>
              {MENU_CATEGORIES.map((category) => (
                <MuiLink
                  key={category}
                  component={Link}
                  to={categoryPath(category)}
                  variant="body2"
                  underline="hover"
                  sx={{ color: "grey.400", "&:hover": { color: "secondary.light" } }}
                >
                  {category}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              About Us
            </Typography>
            {renderLinkList(aboutUs, "/about")}
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Contact
            </Typography>
            <ContactInfo />
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)", my: 4 }} />
        <Typography variant="body2" sx={{ color: "grey.400" }}>
          <MuiLink component={Link} to="/" underline="hover" sx={{ color: "inherit", fontWeight: 700 }}>
            Lumière
          </MuiLink>{" "}
          &copy; {currentYear}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const details = [
  { Icon: LocationOnIcon, label: "Address", value: "24 Rue de la Lumière, Paris 75008" },
  { Icon: PhoneIcon, label: "Phone", value: "+33 1 40 00 00 00" },
  { Icon: EmailIcon, label: "Email", value: "reservations@lumiere-restaurant.com" },
  { Icon: AccessTimeIcon, label: "Hours", value: "Tue–Sun, 6:00 PM – 11:00 PM" },
];

const sections = [
  {
    title: "Reservations",
    body: "We recommend booking at least a week in advance for weekend evenings. Call or email us with your preferred date, time, and party size.",
  },
  {
    title: "Private Events",
    body: "Our private dining room seats up to 16 guests for celebrations, corporate dinners, and tastings. Reach out with your date and headcount for availability.",
  },
  {
    title: "Gift Cards",
    body: "Gift cards are available in any denomination, in person or by phone, and never expire.",
  },
];

export const Contact = () => (
  <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
    <Typography variant="overline" color="secondary.dark">
      Contact
    </Typography>
    <Typography variant="h3" sx={{ mb: 4 }}>
      Contact &amp; Reservations
    </Typography>

    <Grid container spacing={3} sx={{ mb: 5 }}>
      {details.map(({ Icon, label, value }) => (
        <Grid key={label} size={{ xs: 12, sm: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Icon color="secondary" />
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                {label}
              </Typography>
              <Typography variant="body1">{value}</Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>

    <Divider sx={{ mb: 5 }} />

    {sections.map((section, index) => (
      <Box key={section.title} sx={{ mb: index < sections.length - 1 ? 5 : 0 }}>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {section.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {section.body}
        </Typography>
      </Box>
    ))}
  </Container>
);

import { Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { ComponentType } from "react";

interface GridContactInfoProps {
  Icon: ComponentType;
  content: string;
}

const GridContactInfo = ({ Icon, content }: GridContactInfoProps) => (
  <>
    <Grid size={2}>
      <Icon />
    </Grid>
    <Grid size={10}>
      <Typography variant="body2" sx={{ color: "grey.400" }}>
        {content}
      </Typography>
    </Grid>
  </>
);

export const ContactInfo = () => (
  <Grid container spacing={1} sx={{ alignItems: "center", color: "grey.400" }}>
    <GridContactInfo Icon={LocationOnIcon} content="24 Rue de la Lumière, Paris 75008" />
    <GridContactInfo Icon={PhoneIcon} content="+33 1 40 00 00 00" />
    <GridContactInfo Icon={EmailIcon} content="reservations@lumiere-restaurant.com" />
    <GridContactInfo Icon={AccessTimeIcon} content="Tue–Sun, 6:00 PM – 11:00 PM" />
  </Grid>
);

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

const AUTH_IMAGE = "https://images.unsplash.com/photo-1758972574371-57cf8c42bae8?w=1200&h=1200&fit=crop&fm=jpg&q=80";

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  quote: string;
  children: ReactNode;
}

export const AuthLayout = ({ eyebrow, title, quote, children }: AuthLayoutProps) => (
  <Box sx={{ display: "flex", minHeight: { xs: "auto", md: 640 } }}>
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        width: "45%",
        alignItems: "flex-end",
        p: 6,
        color: "primary.contrastText",
        backgroundImage: `linear-gradient(0deg, rgba(28,22,17,0.85), rgba(28,22,17,0.25)), url(${AUTH_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ color: "secondary.main" }}>
          {eyebrow}
        </Typography>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 360 }}>
          {quote}
        </Typography>
      </Box>
    </Box>

    <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 3, sm: 6 } }}>
      <Box sx={{ width: "100%", maxWidth: 460 }}>{children}</Box>
    </Box>
  </Box>
);

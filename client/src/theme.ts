import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1C1611",
      dark: "#000000",
      light: "#3A322B",
      contrastText: "#FBF7F0",
    },
    secondary: {
      main: "#B8933D",
      dark: "#93752F",
      light: "#D2B876",
      contrastText: "#1C1611",
    },
    warning: {
      main: "#B8933D",
    },
    error: {
      main: "#8C2F39",
    },
    success: {
      main: "#3B5D42",
    },
    background: {
      default: "#FBF7F0",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#241F1B",
      secondary: "#6B6259",
    },
    divider: "#E4DCCB",
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" },
    overline: { letterSpacing: "0.12em", fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          paddingLeft: 24,
          paddingRight: 24,
        },
        outlined: {
          borderWidth: 1,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 2,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          fontSize: "0.7rem",
        },
      },
    },
  },
});

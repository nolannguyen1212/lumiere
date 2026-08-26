import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { cookies } from "./lib/cookies";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <CookiesProvider cookies={cookies} defaultSetOptions={{ path: "/" }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </ThemeProvider>,
);

import "./App.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HideAppBar } from "./components/NavBar/HideNavBar";
import { Footer } from "./components/Footer/Footer";
import { LoginProvider } from "./contexts/LoginContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { OrderProvider } from "./contexts/OrderContext";
import { SearchProvider } from "./contexts/SearchContext";
import { About } from "./pages/about/About";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { Cart } from "./pages/cart/Cart";
import { Contact } from "./pages/contact/Contact";
import { Menu } from "./pages/menu/Menu";
import { MenuItemView } from "./pages/menu/MenuItemView";
import { OrderHistory } from "./pages/orders/OrderHistory";
import { WelcomePage } from "./pages/welcome/WelcomePage";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LoginProvider>
        <NotificationProvider>
          <OrderProvider>
            <SearchProvider>
              <Toaster toastOptions={{ style: { background: "rgb(51, 65, 85)", color: "#fff" } }} />
              <div className="app-container">
                <HideAppBar />
                <main className="content">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/orders/me" element={<Cart />} />
                    <Route path="/orders/history" element={<OrderHistory />} />
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/menu/category/:category" element={<Menu />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:menuItemId" element={<MenuItemView />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </SearchProvider>
          </OrderProvider>
        </NotificationProvider>
      </LoginProvider>
    </LocalizationProvider>
  );
};

export default App;

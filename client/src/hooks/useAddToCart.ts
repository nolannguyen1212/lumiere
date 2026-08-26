import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { addOrderItem } from "../api/orderItems";
import { useLogin } from "./useLogin";
import { useOrder } from "./useOrder";
import { MenuItem } from "../type";

export const useAddToCart = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { refreshOrderItems } = useOrder();
  const [, setCookie, removeCookie] = useCookies(["access-token", "refresh-token", "isLoggedIn"]);
  const navigate = useNavigate();

  const requireLogin = () => {
    removeCookie("access-token");
    removeCookie("refresh-token");
    setCookie("isLoggedIn", false, { path: "/", secure: true });
    setIsLoggedIn(false);
    navigate("/login");
  };

  return async (menuItem: MenuItem) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to your order.");
      navigate("/login");
      return;
    }

    try {
      await addOrderItem(menuItem.id);
      refreshOrderItems();
      toast.success(`Added ${menuItem.name} to your order!`);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        requireLogin();
        return;
      }

      toast.error("Something bad happened!");
      console.error("Failed to add item to order:", error);
    }
  };
};

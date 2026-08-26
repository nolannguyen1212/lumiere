import { createContext } from "react";

export interface LoginContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const LoginContext = createContext<LoginContextValue | null>(null);

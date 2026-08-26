import { PropsWithChildren, useState } from "react";
import { useCookies } from "react-cookie";
import { LoginContext } from "./login-context";

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [cookies] = useCookies(["isLoggedIn"]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookies["isLoggedIn"]));

  return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</LoginContext.Provider>;
};

import AppBar from "@mui/material/AppBar";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Fragment, ReactElement } from "react";
import { NavBar } from "./NavBar";

function HideOnScroll({ children }: { children: ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function HideAppBar() {
  return (
    <Fragment>
      <HideOnScroll>
        <AppBar>
          <NavBar />
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </Fragment>
  );
}

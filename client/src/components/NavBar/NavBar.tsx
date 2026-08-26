import { alpha, styled } from "@mui/material/styles";
import {
  AccountCircle,
  Notifications as NotificationsIcon,
  Person,
  Receipt,
  Search as SearchIcon,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem as MuiMenuItem,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchMenuItems } from "../../api/menu";
import { useLogin } from "../../hooks/useLogin";
import { useNotifications } from "../../hooks/useNotifications";
import { useOrder } from "../../hooks/useOrder";
import { useSearch } from "../../hooks/useSearch";
import { PLACEHOLDER_IMAGE } from "../../lib/placeholderImage";
import { MenuItem } from "../../type";
import { SideBar } from "../SideBar/SideBar";

const SEARCH_DEBOUNCE_MS = 400;
const MAX_SUGGESTIONS = 5;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.18),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.28),
  },
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
  },
}));

export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setCookie, removeCookie] = useCookies(["access-token", "refresh-token", "isLoggedIn"]);
  const { setSearchParams } = useSearch();
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { orderItems, setOrderItems } = useOrder();
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const navigate = useNavigate();
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [searchAnchorEl, setSearchAnchorEl] = useState<HTMLDivElement | null>(null);
  const [suggestions, setSuggestions] = useState<MenuItem[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => () => clearTimeout(searchDebounceRef.current), []);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie("access-token");
    removeCookie("refresh-token");
    setCookie("isLoggedIn", false, { path: "/", secure: true });
    setIsLoggedIn(false);
    setOrderItems([]);
    toast.success("Logged Out!");
    navigate("/login");
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      slotProps={{
        paper: {
          variant: "outlined",
          sx: { mt: 1, minWidth: 160 },
        },
      }}
    >
      <MuiMenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
        Log out
      </MuiMenuItem>
    </Menu>
  );

  const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      setSearchParams(value);

      if (!value.trim()) {
        setSuggestions([]);
        setSuggestionsOpen(false);
        return;
      }

      fetchMenuItems({ name: value, page: 1 })
        .then((data) => {
          setSuggestions(data.results.slice(0, MAX_SUGGESTIONS));
          setSuggestionsOpen(true);
        })
        .catch((error) => console.error("Failed to fetch search suggestions:", error));
    }, SEARCH_DEBOUNCE_MS);
  };

  const handleSuggestionClick = (menuItem: MenuItem) => {
    setSuggestionsOpen(false);
    navigate(`/menu/${menuItem.id}`);
  };

  const notificationsOpen = Boolean(notificationsAnchorEl);

  const handleNotificationsOpen = (event: MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
    markAllRead();
  };

  const handleNotificationsClose = () => setNotificationsAnchorEl(null);

  return (
    <>
      <Toolbar sx={{ gap: { xs: 0.5, sm: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <SideBar />
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", letterSpacing: "0.04em" }}
          >
            Lumière
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", flex: { xs: 1, sm: 2 }, maxWidth: 560, mx: "auto" }}>
          <Search ref={setSearchAnchorEl} sx={{ width: "100%" }}>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search our menu…" inputProps={{ "aria-label": "search" }} onChange={handleInputChanged} />
          </Search>
          <Popper
            open={suggestionsOpen && suggestions.length > 0}
            anchorEl={searchAnchorEl}
            placement="bottom-start"
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 1, width: { xs: 280, sm: "min(560px, 90vw)" } }}
          >
            <ClickAwayListener onClickAway={() => setSuggestionsOpen(false)}>
              <Paper elevation={4} sx={{ mt: 0.5 }}>
                <List dense disablePadding>
                  {suggestions.map((menuItem) => (
                    <ListItemButton key={menuItem.id} onClick={() => handleSuggestionClick(menuItem)}>
                      <Avatar
                        variant="rounded"
                        src={menuItem.image_upload_url || PLACEHOLDER_IMAGE}
                        alt={menuItem.name}
                        sx={{ width: 36, height: 36, mr: 1.5 }}
                      />
                      <ListItemText primary={menuItem.name} secondary={`$${menuItem.price}`} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: { xs: 0, sm: 1 }, flex: 1 }}>
          {isLoggedIn ? (
            <>
              <IconButton size="large" aria-label="notifications" color="inherit" onClick={handleNotificationsOpen}>
                <Badge badgeContent={unreadCount} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="order history" color="inherit" onClick={() => navigate("/orders/history")}>
                <Receipt />
              </IconButton>
              <IconButton size="large" aria-label="cart" color="inherit" onClick={() => navigate("/orders/me")}>
                <Badge badgeContent={orderItems.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <IconButton size="medium" color="inherit" aria-label="Login" onClick={() => navigate("/login")}>
              <Person />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      {renderMenu}

      <Popper
        open={notificationsOpen}
        anchorEl={notificationsAnchorEl}
        placement="bottom-end"
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1, width: { xs: 300, sm: 360 } }}
      >
        <ClickAwayListener onClickAway={handleNotificationsClose}>
          <Paper variant="outlined" sx={{ mt: 1, maxHeight: 420, overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ p: 3, textAlign: "center" }}>
                No notifications yet
              </Typography>
            ) : (
              <List dense disablePadding>
                {notifications.map((notification) => (
                  <ListItemButton
                    key={notification.id}
                    onClick={() => {
                      handleNotificationsClose();
                      if (notification.order) {
                        navigate("/orders/history");
                      }
                    }}
                  >
                    <ListItemText
                      primary={notification.message}
                      secondary={new Date(notification.created_at).toLocaleString()}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

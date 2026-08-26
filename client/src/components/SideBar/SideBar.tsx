import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryPath, MENU_CATEGORIES } from "../../constants/menuCategories";

interface NavItem {
  label: string;
  path: string;
}

const categoryItems: NavItem[] = [
  { label: "Full Menu", path: "/menu" },
  ...MENU_CATEGORIES.map((category) => ({ label: category, path: categoryPath(category) })),
];

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const renderNavList = (title: string, items: NavItem[]) => (
    <List>
      <Typography variant="overline" sx={{ px: 2, fontWeight: 800, color: "text.secondary" }}>
        {title}
      </Typography>
      {items.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const drawerList = (
    <Box sx={{ width: { xs: "80vw", sm: 320 } }} role="presentation" onClick={toggleDrawer(false)}>
      {renderNavList("Menu", categoryItems)}
    </Box>
  );

  return (
    <div>
      <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 1 }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </div>
  );
};

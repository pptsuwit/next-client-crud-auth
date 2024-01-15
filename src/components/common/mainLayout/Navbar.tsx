"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";

import Drawer from "@mui/material/Drawer";
import ThemeSwitcher from "@/components/baseComponent/ThemeSwitcher";
import { Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Link from "next/link";
interface Props {
  window?: () => Window;
}
const drawerWidth = 240;
const navItems = [
  { name: "Home", link: "/dashboard", icon: <HomeIcon /> },
  { name: "About", link: "/about", icon: <InfoIcon /> },
  { name: "User", link: "/user", icon: <AccountCircleIcon /> },
  { name: "Customer", link: "/customer", icon: <AccountBoxIcon /> },
];

function ResponsiveAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="bg-primary py-3">
        <div className="text-[26px] text-white">Side bar menu</div>
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link
              passHref
              href={item.link}
              className="w-full no-underline flex  pl-10  py-3 hover:bg-purple-50 dark:hover:bg-zinc-800 text-black dark:text-white dark:hover:text-[#9147ff] hover:text-[#9147ff] font-bold"
            >
              <div className="pr-2">{item.icon}</div>
              {item.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <nav>
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  // display: { xs: "block", sm: "block", md: "none" },
                  "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
            </nav>
          </Box>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

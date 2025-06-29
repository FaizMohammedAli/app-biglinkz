import React from "react";

import {
  AppBar,
  Button,
  Card,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InstagramIcon from "@mui/icons-material/Instagram";
import { drawerWidth } from "../Sidemenu/Sidemenu";

export const Header = (props: any) => {
  return (
    <AppBar
      className="bl-header"
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
        backgroundImage:
          "linear-gradient(to right, rgba(128, 0, 128, 1), rgba(0, 0, 139, 1))",
        //backgroundImage:
        //"url('https://ik.imagekit.io/mino2112/biglinkz%20intern/purple-and-blue-background-1280-x-800-ajp62v7qahujohnv.jpg?updatedAt=1732426097312')",
      }}
      // component={Card}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <InstagramIcon />
        </IconButton>
        <Typography noWrap variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BigLinkz
        </Typography>
        <IconButton>
          <AccountCircle sx={{ color: "white" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

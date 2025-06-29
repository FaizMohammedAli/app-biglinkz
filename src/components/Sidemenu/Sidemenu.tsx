import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from "react-router-dom";
import CampaignIcon from "@mui/icons-material/Campaign";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

export const drawerWidth = 200;

interface IMenu {
  title: string;
  icon: any;
  route: string;
}

const influencerMenu = [
  {
    title: "Dashboard",
    icon: <CampaignIcon sx={{ color: "primary.contrastText", fontSize: 30 }} />,
    route: "/user/influencer",
  },
  {
    title: "My Campaigns",
    icon: <CampaignIcon sx={{ color: "primary.contrastText", fontSize: 30 }} />,
    route: "/user/influencer_activecampaigns",
  },
  {
    title: "Notifications",
    icon: <CampaignIcon sx={{ color: "primary.contrastText", fontSize: 30 }} />,
    route: "/user/notifications",
  },
  {
    title: "Payments",
    icon: <PaymentIcon sx={{ color: "primary.contrastText" }} />,
    route: "/user/influencerPayment",
  },
  {
    title: "My Profile",
    icon: <AccountBoxIcon sx={{ color: "primary.contrastText" }} />,
    route: "/user/my-profile",
  },
  {
    title: "Help",
    icon: <HelpIcon sx={{ color: "primary.contrastText" }} />,
    route: "/user/help",
  },
  {
    title: "Logout",
    icon: <LogoutIcon sx={{ color: "primary.contrastText" }} />,
    route: "/login",
  },
];

const businessOwnerMenu = [
  {
    title: "Dashboard",
    icon: <CampaignIcon sx={{ color: "primary.contrastText", fontSize: 30 }} />,
    route: "/user/business",
  },
  {
    title: "My Campaigns",
    icon: <CampaignIcon sx={{ color: "primary.contrastText", fontSize: 30 }} />,
    route: "/user/my-campaigns",
  },
  {
    title: "Notifications",
    icon: <CampaignIcon sx={{ color: "primary.contrastText", fontSize: 30 }} />,
    route: "/user/notifications",
  },
  {
    title: "Payments",
    icon: <PaymentIcon sx={{ color: "primary.contrastText" }} />,
    route: "/user/businessPayment",
  },
  {
    title: "My Profile",
    icon: <AccountBoxIcon sx={{ color: "primary.contrastText" }} />,
    route: "/user/businessProfile",
  },
  {
    title: "Help",
    icon: <HelpIcon sx={{ color: "primary.contrastText" }} />,
    route: "/user/business-help",
  },
  {
    title: "Logout",
    icon: <LogoutIcon sx={{ color: "primary.contrastText" }} />,
    route: "/login",
  },
];

export const Sidemenu = (props: any) => {
  const [accountType, setAccountType] = useState(
    localStorage.getItem("accountType")
  );
  const [menu, setMenu] = useState<IMenu[]>(businessOwnerMenu);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const type = localStorage.getItem("accountType");
    setAccountType(type);
    setMenu(type === "influencer" ? influencerMenu : businessOwnerMenu);
  }, [localStorage.getItem("accountType")]);

  const handleSideMenuClick = (menuItem: any) => {
    if (menuItem.title === "Logout") {
      setOpenDialog(true); // Open the custom dialog
    } else {
      navigate(menuItem.route); // Navigate to other routes
    }
  };

  const handleDialogClose = (confirmed: boolean) => {
    setOpenDialog(false); // Close the dialog
    if (confirmed) {
      navigate("/login"); // Navigate to /login if the user confirms
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(rgba(128, 0, 128, 1), rgba(0, 0, 139, 1))",
            color: "primary.contrastText",
          },
        }}
      >
        <Toolbar>
          <IconButton>
            <InstagramIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {menu.map((menuItem) => (
            <ListItem
              key={menuItem.title}
              disablePadding
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              <ListItemButton
                onClick={() => handleSideMenuClick(menuItem)}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Background color on hover
                    color: "#fff", // Text color on hover
                    transition: "background-color 0.3s ease, color 0.3s ease",
                  },
                }}
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Custom Logout Dialog */}
      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

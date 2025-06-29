import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Toolbar, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CampaignIcon from "@mui/icons-material/Campaign";

import { CampaignHeader } from "../CreateCampaign/CampaignHeader";
import theme from "../../Theme/Theme";
import { getNotifications } from "../../store/apiPaths";
import { setViewed } from "../../store/apiPaths";

interface INotificationContent {
  id: any,
  content: string;
  campaign_id: any,
  status: any,
  created_at: string;
}

interface INotifications {
  message: string;
  notifications?: INotificationContent[] | null;
}

interface INotificationItemProps {
  notification: INotificationContent;
  isNew: boolean;
}

interface INoNotificationText {
  message: string;
}

const NoNotificationText = (props: INoNotificationText) => {
  return <span>{props.message}</span>;
};

const NotificationItem = (props: INotificationItemProps) => {
  const navigate = useNavigate();
  const responseData = {
    notification_id: props.notification.id,
  };

  const handleClick = async () => {
    try {
      const response = await fetch(setViewed, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responseData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        navigate(`/user/campaign/${props.notification.campaign_id}`);
      } else {
        console.log("an error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PrimaryText = (
    <span style={{ fontWeight: "bold" }}>{props.notification.content}</span>
  );
  const SecondaryText = (
    <span style={{ fontStyle: "italic" }}>
      {new Date(props.notification.created_at).toString().slice(0, 16)}
    </span>
  );

  return (
    <ListItem
      onClick={() => {
        handleClick();
      }}
      style={{
        borderRadius: "5px",
        border: "3px solid #f4f4f4",
        margin: "10px",
        backgroundColor:
          props.notification.status === "viewed" ? "#ffffff" : "#c5dfed",
      }}
      className="hover:cursor-pointer"
    >
      <ListItemAvatar>
        <Avatar>
          <CampaignIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={PrimaryText} secondary={SecondaryText} />
    </ListItem>
  );
};

interface INotificationsListProps {
  notifications: INotifications;
  lastCheckedTime: string;
}

const NotificationsList = (props: INotificationsListProps) => {
  return (
    <>
      {props.notifications?.notifications ? (
        props.notifications?.notifications.map((item, index) => {
          const isNew =
            new Date(item.created_at) > new Date(props.lastCheckedTime); // Determine if it's new
          return (
            <NotificationItem key={index} notification={item} isNew={isNew} />
          );
        })
      ) : (
        <NoNotificationText message={props.notifications.message} />
      )}
    </>
  );
};

export const NotificationsContainer = (props: any) => {
  const [notifications, setNotifications] = React.useState<INotifications>({
    message: "",
    notifications: null,
  });
  const [lastCheckedTime, setLastCheckedTime] = React.useState<string>(
    localStorage.getItem("lastCheckedTime") || new Date().toISOString()
  );

  React.useEffect(() => {
    fetch(getNotifications + "?user_id=" + localStorage.getItem("user_id"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNotifications(res);
        localStorage.setItem("lastCheckedTime", new Date().toISOString());
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 3,
          marginLeft: "200px",
          height: "100vh", // Full height
          overflowY: "auto", // Enable scrolling
        }}
      >
        <Toolbar />
        <CampaignHeader title={"Notifications"} />
        <List sx={{ width: "85%" }}>
          <NotificationsList
            notifications={notifications}
            lastCheckedTime={lastCheckedTime}
          />
        </List>
      </Box>
    </ThemeProvider>
  );
};

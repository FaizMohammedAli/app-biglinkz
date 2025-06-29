import React from "react";
import { NavLink, redirect } from "react-router-dom";
import {
  Box,
  Toolbar,
  Button,
  Typography,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import {
  Campaign,
  AddCircleOutline,
  CalendarToday,
  ArrowForwardIos,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { CampaignHeader } from "../../../containers/CreateCampaign/CampaignHeader";
import { Header } from "../../../components/Header/Header";
import { Sidemenu } from "../../../components/Sidemenu/Sidemenu";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import theme from "../../../Theme/Theme";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { eligibleCampaigns } from "../../../store/apiPaths";

const loggedInUser = {
  name: "Livingstone",
};

const ActiveCampaignItem = (props: any) => {
  const navigate = useNavigate();
  const handleCampaignClick = () => {
    props.onClick(props.id);
  };

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Ensure theme is provided */}
      <Card
        sx={{
          height: "260px",
          width: "100%",
          maxWidth: "300px",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d3b7ed",
          textAlign: "center",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
          },
        }}
        onClick={() => navigate("/user/my-campaigns")}
        className="bg-gradient-to-b from-[#c59ee8] to-[#e39ee8]"
      >
        {/* Brand Logo */}
        <Box
          sx={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <img
            src={props.brand_logo}
            alt="Brand Logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box>
          <Typography variant="h6" fontWeight="bold" color="secondary.dark">
            {props.brand_name}
          </Typography>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary.main"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Campaign fontSize="small" /> {props.campaign_title}
          </Typography>
        </Box>

        {/* Duration */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}
        >
          <CalendarToday fontSize="small" color="primary" />
          <span
            style={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            Duration:
          </span>{" "}
          {props.start_date} - {props.end_date}
        </Typography>

        {/* Navigate Icon */}
        <Tooltip title="View Campaign">
          <ArrowForwardIos
            sx={{
              color: "primary.light",
              mt: 2,
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "translateX(5px)",
                color: "primary.dark",
              },
            }}
          />
        </Tooltip>
      </Card>
    </ThemeProvider>
  );
};

const Metrics = (props: any) => {
  return (
    <div className="flex align-center gap-[50px] ml-[50px]">
      <Card
        sx={{
          width: "25%",
          marginBottom: "20px",
          padding: "10px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
          backgroundColor: "#e4eaf0",
          textAlign: "center",
        }}
        className="hover:shadow-xl bg-gradient-to-b from-[#c59ee8] to-[#e39ee8]"
      >
        <CardContent className="w-[100%]">
          <Typography className="font-bold text-[blue] text-2xl">
            Total Number of Ads
          </Typography>
          <Typography className="text-2xl font-semibold"> 10 </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: "25%",
          marginBottom: "20px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#e4eaf0",
          textAlign: "center",
        }}
        className="hover:shadow-xl bg-gradient-to-b from-[#c59ee8] to-[#e39ee8]"
      >
        <CardContent className="w-[100%]">
          <Typography className="font-bold text-[blue] text-2xl">
            Revenue Generated
          </Typography>
          <Typography className="text-2xl font-semibold"> $50000 </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          width: "25%",
          marginBottom: "20px",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#e4eaf0",
          textAlign: "center",
        }}
        className="hover:shadow-xl bg-gradient-to-b from-[#c59ee8] to-[#e39ee8]"
      >
        <CardContent className="w-[100%]">
          <Typography className="font-bold text-[blue] text-2xl">
            Total Impression
          </Typography>
          <Typography className="text-2xl font-semibold">70,000</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

interface IWelcome {
  name: string;
}
const Welcome = (props: IWelcome) => {
  return <>Welcome {props.name},</>;
};

interface IMainView {
  loggedInUser: any;
  activeCampaignsCount: number;
}

const MainView = (props: IMainView) => {
  const [activeCampaigns, setActiveCampaigns] = React.useState<any[]>([]);
  const [visibleCampaigns, setVisibleCampaigns] = React.useState<any[]>([]);
  const [activeCampaignsCount, setActiveCampaignsCount] = React.useState<number>();
  const [loading, setLoading] = React.useState(false);

  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch eligible campaigns from API
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${eligibleCampaigns}?user_id=${userId}`);
        const data = await response.json();

        console.log("API Response:", data);
        console.log("Is it an array:", Array.isArray(data.eligible_campaigns));

        if (!data || !Array.isArray(data.eligible_campaigns)) {
          console.error("Invalid response structure:", data);
          setActiveCampaigns([]);
          setActiveCampaignsCount(0);
          setVisibleCampaigns([]);
          return;
        }

        setActiveCampaigns(data.eligible_campaigns);
        setActiveCampaignsCount(data.eligible_campaigns.length);
        setVisibleCampaigns(data.eligible_campaigns.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
        setActiveCampaigns([]);
        setActiveCampaignsCount(0);
        setVisibleCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      {loading ? (
        <Typography>Loading campaigns...</Typography>
      ) : activeCampaignsCount != 0 ? (
        <div>
          {" "}
          <div className="text-xl font-semibold mb-4">
            Active Eligible Campaigns
          </div>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
              marginBottom: "50px",
            }}
          >
            {visibleCampaigns.map((item) => (
              <ActiveCampaignItem key={item.id} {...item} />
            ))}
            <Button onClick={() => navigate("/user/approvalPage")}>
              See More
            </Button>
          </Box>
          <Metrics />
        </div>
      ) : (
        <div>
          <Welcome name={loggedInUser.name} />
          <Typography>No Eligible Campaigns</Typography>
        </div>
      )}
    </>
  );
};

export const InfluencerDashboardHome = (props: any) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "200px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Toolbar />
      <CampaignHeader title="Dashboard" />
      <MainView loggedInUser={loggedInUser} activeCampaignsCount={0} />
    </Box>
  );
};

export const InfluencerDashboard = (props: any) => {
  const [selectedMenu, setSelectedMenu] = React.useState("");
  return (
    <>
      <Header />
      <Sidemenu />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

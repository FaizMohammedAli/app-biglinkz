import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  Toolbar,
  TextField,
  MenuItem,
  ThemeProvider,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { CampaignHeader } from "../CreateCampaign/CampaignHeader";
import theme from "../../Theme/Theme";
import { getcampaigns } from "../../store/apiPaths";

const CampaignItem = (props: any) => {
  const handleCampaignClick = () => {
    props.onClick(props.campaign_id);
  };

  return (
    <Card
      sx={{
        width: "60%",
        marginBottom: "20px",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: theme.palette.secondary.dark }}
        >
          {props.influencer_location}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          style={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          {props.campaign_title}
        </Typography>
        <Typography sx={{ mb: 1.5, color: theme.palette.text.primary }}>
          Target Audience: {props.target_followers}
        </Typography>
        <Typography variant="body1">
          <span className="font-bold">Caption: </span>
          {props.caption}
        </Typography>
        <Typography
          variant="body2"
          style={{ marginTop: "8px", color: theme.palette.info.main }}
        >
          <span className="font-bold">Duration: </span>
          {`${props.start_date} - ${props.end_date}`}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            marginTop: "8px",
            color: theme.palette.success.main,
          }}
        >
          <span className="text-black">Status: </span> {props.status}
        </Typography>
        <Button
          onClick={handleCampaignClick}
          size="small"
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            marginTop: "10px",
          }}
        >
          View Full Campaign
        </Button>
      </CardActions>
    </Card>
  );
};

export const MyCampaigns = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${getcampaigns}?user_id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCampaigns(data.campaigns);
          setFilteredCampaigns(data.campaigns);
        } else {
          setError("Failed to fetch campaigns");
        }
      } catch (error) {
        setError("An error occurred while fetching campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const filtered = campaigns.filter(
      (campaign) =>
        campaign.campaign_title
          .toLowerCase()
          .includes(filterName.toLowerCase()) &&
        (filterStatus === "" ||
          filterStatus === "all" ||
          campaign.status === filterStatus)
    );
    setFilteredCampaigns(filtered);
  }, [filterName, filterStatus, campaigns]);

  const onCampaignClick = (campaignId: string) => {
    navigate("/user/campaign/" + campaignId);
  };

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          p: 3,
          marginLeft: "350px",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Toolbar />
        <div className="flex gap-[100px] items-center">
          <CampaignHeader title={"My Campaigns"} />
          <Box sx={{ marginBottom: 3, display: "flex" }}>
            <TextField
              label="Filter by Name"
              variant="outlined"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <TextField
              label="Status"
              variant="outlined"
              select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{ width: "70%" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
            </TextField>
          </Box>
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {filteredCampaigns.map((item) => (
            <CampaignItem
              key={item.campaign_id}
              onClick={onCampaignClick}
              {...item}
            />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

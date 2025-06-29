import React, { useState, useEffect } from "react";
import { NavLink, redirect } from "react-router-dom";
import {
  Box,
  Toolbar,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Campaign,
  AddCircleOutline,
  CalendarToday,
  ArrowForwardIos,
} from "@mui/icons-material";
import {
  FaUserFriends,
  FaHeart,
  FaChartLine,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import { CampaignHeader } from "../CreateCampaign/CampaignHeader";
import { Header } from "../../components/Header/Header";
import { Sidemenu } from "../../components/Sidemenu/Sidemenu";
import { getcampaigns } from "../../store/apiPaths";
import { getInstagramProfileSearch } from "../../store/apiPaths";
import { getInstagramProfileStats } from "../../store/apiPaths";
import theme from "../../Theme/Theme";

const activeCampaigns = 0;
const loggedInUser = {
  name: "Livingstone",
};

interface IWelcome {
  name: string;
}
const Welcome = (props: IWelcome) => {
  return <>Welcome {props.name},</>;
};

const NoActiveCampaigns = () => {
  const onCreateCampaignClick = () => {
    console.log("here");
    return redirect("/user/new-campaign");
  };
  return (
    <>
      <div>&nbsp;</div>
      <div>
        <Button
          onClick={onCreateCampaignClick}
          type="button"
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          <NavLink to="/user/new-campaign" style={{ color: "inherit" }}>
            Create a new Campaign{" "}
          </NavLink>
        </Button>
      </div>
    </>
  );
};

interface IMainView {
  loggedInUser: any;
  activeCampaignsCount: number;
}

const CampaignItem = (props: any) => {
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

        {/* Brand & Campaign Details */}
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

const InfluencerSearch = () => {
  const [influencer, setInfluencer] = React.useState<string>("");
  const [influencerData, setInfluencerData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submit button clicked");

    try {
      const response1 = await fetch(
        `${getInstagramProfileSearch}?username=${influencer}`
      );
      const data1 = await response1.json();

      const response2 = await fetch(
        `${getInstagramProfileStats}?username=${influencer}`
      );
      const data2 = await response2.json();

      if (response1.ok && response2.ok) {
        console.log("Both API calls successful", { ...data1, ...data2 });

        setInfluencerData((prevData:any) => ({
          ...prevData,
          ...data1,
          ...data2,
        }));
      } else {
        console.error("Error fetching profiles:", { data1, data2 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col mr-[250px] bg-gradient-to-b from-[#6B65C7] to-[#A940D0] rounded-lg shadow-xl p-4 w-[80%]">
      <Container className="flex  justify-center items-center gap-4 w-[100%]">
        <Typography
          variant="h4"
          color="white"
          className="text-center font-semibold w-[50%]"
        >
          Influencer Search
        </Typography>

        <div className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-xl shadow-md w-[80%] mx-auto">
          <div className="w-12 h-12">
            <img
              src="https://ik.imagekit.io/varsh0506/Internship/instagram.png?updatedAt=1726943292562"
              alt="Instagram Icon"
              className="w-full h-full object-contain"
            />
          </div>

          <input
            placeholder="Start by Searching . . ."
            className="flex-1 text-gray-700 px-3 py-2 border-none focus:outline-none"
            onChange={(e) => setInfluencer(e.target.value)}
          />

          <button
            className="px-4 py-2 text-white bg-[#5151d6] rounded-3xl shadow-md hover:bg-[#3f3fcf] transition-all duration-300"
            onClick={handleSubmit}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </Container>
      {loading && (
        <div className="text-white text-center">
          Fetching Influencer Data...
        </div>
      )}
      <div className="w-[60%] mx-auto">
        {influencerData.bio && (
          <Card className="mt-6 bg-white shadow-xl rounded-xl overflow-hidden p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-200">
            <CardContent>
              {/* Profile Section */}
              <Box display="flex" alignItems="center" gap={4}>
                <Avatar
                  src={`data:image/png;base64,${influencerData?.profile_pic_base64}`}
                  alt={influencerData?.username}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "4px solid #4F46E5",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <Box>
                  <Typography variant="h5" className="text-gray-900 font-bold">
                    {influencerData?.username}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600">
                    {influencerData?.full_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-700 italic mt-2"
                  >
                    {influencerData?.bio}
                  </Typography>
                </Box>
              </Box>

              {/* Stats Section */}
              <Box
                display="flex"
                justifyContent="space-between"
                className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <Typography
                  variant="body2"
                  className="font-semibold flex items-center gap-1 text-gray-800"
                >
                  <FaUserFriends className="text-indigo-600" />{" "}
                  <strong>{influencerData?.followers}</strong> Followers
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold flex items-center gap-1 text-gray-800"
                >
                  <FaUserFriends className="text-indigo-600" />{" "}
                  <strong>{influencerData?.following}</strong> Following
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold flex items-center gap-1 text-gray-800"
                >
                  <FaHeart className="text-red-500" />{" "}
                  <strong>{influencerData?.posts}</strong> Posts
                </Typography>
              </Box>

              {/* Contact Section */}
              {(influencerData?.phone_number || influencerData?.email) && (
                <Box className="mt-5 bg-indigo-50 p-4 rounded-lg shadow-sm flex flex-col gap-2">
                  {influencerData?.phone_number && (
                    <Typography
                      variant="body2"
                      className="text-gray-800 flex items-center gap-2"
                    >
                      <FaPhone className="text-indigo-600" />{" "}
                      {influencerData.phone_number}
                    </Typography>
                  )}
                  {influencerData?.email && (
                    <Typography
                      variant="body2"
                      className="text-gray-800 flex items-center gap-2"
                    >
                      <FaEnvelope className="text-indigo-600" />{" "}
                      {influencerData.email}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Additional Stats */}
              <Box
                display="flex"
                justifyContent="space-between"
                className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <Typography
                  variant="body2"
                  className="font-semibold flex items-center gap-1 text-gray-800"
                >
                  <FaHeart className="text-red-500" />{" "}
                  <strong>{influencerData?.average_likes}</strong> Avg Likes
                </Typography>
                <Typography
                  variant="body2"
                  className="font-semibold flex items-center gap-1 text-gray-800"
                >
                  <FaChartLine className="text-green-500" />{" "}
                  <strong>{influencerData?.engagement_rate}</strong> Engagement
                  Rate
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

const MainView = (props: IMainView) => {
  const [campaigns, setCampaigns] = React.useState<any[]>([]);
  const [campaignsCount, setCampaignsCount] = React.useState<any>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [visibleCampaigns, setVisibleCampaigns] = React.useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const userId = localStorage.getItem("user_id");
      console.log("User ID from localStorage:", userId); // Debugging

      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        console.log(
          "Fetching campaigns from:",
          `${getcampaigns}?user_id=${userId}`
        );
        const response = await fetch(`${getcampaigns}?user_id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Campaigns fetched:", data.campaigns);
          console.log("is it an array:", Array.isArray(data));
          setCampaigns(data.campaigns);
          setVisibleCampaigns(data.campaigns.slice(0, 3)); // Display only the first 3 campaigns
          setCampaignsCount(data.campaigns.length);
          console.log(campaigns);
        } else {
          console.error("Failed to fetch campaigns:", response.statusText);
          setError("Failed to fetch campaigns");
        }
      } catch (error) {
        console.error("Error during campaign fetch:", error);
        setError("An error occurred while fetching campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div>Loading campaigns...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Campaign color="primary" fontSize="large" />
        <Typography variant="h5" fontWeight="bold">
          Welcome, User 👋
        </Typography>
      </Box>

      {campaignsCount !== 0 ? (
        <Typography color="text.secondary" className="text-lg font-medium">
          You currently have existing campaigns. You may create additional
          campaigns.
        </Typography>
      ) : (
        <Typography color="text.secondary" className="text-lg font-medium">
          There are no active campaigns. Start by creating one now!
        </Typography>
      )}

      <NoActiveCampaigns />
      <InfluencerSearch />
      {campaignsCount != 0 ? (
        <div>
          {" "}
          <div className="text-xl font-semibold mb-4 mt-5">
            Campaigns Created{" "}
          </div>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 4,
              //marginBottom: "50px",
            }}
          >
            {visibleCampaigns.map((item:any) => (
              <CampaignItem key={item.id} {...item} />
            ))}
            <Button onClick={() => navigate("/user/my-campaigns")}>
              See More
            </Button>
          </Box>
        </div>
      ) : (
        <div>
          <Welcome name={loggedInUser.name} />
          <Typography>No Campaigns Created</Typography>
        </div>
      )}
    </>
  );
};

export const DashboardHome = (props: any) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "250px",
        minHeight: "100%",
        overflowY: "auto",
      }}
    >
      <Toolbar />
      <MainView
        loggedInUser={loggedInUser}
        activeCampaignsCount={activeCampaigns}
      />
    </Box>
  );
};

export const Dashboard = (props: any) => {
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

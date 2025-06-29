import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Toolbar,
  Checkbox,
  FormControlLabel,
  CardMedia,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { eligibleCampaigns } from "../../../store/apiPaths";
import { CampaignHeader } from "../../../containers/CreateCampaign/CampaignHeader";
import { Header } from "../../../components/Header/Header";
import { Sidemenu } from "../../../components/Sidemenu/Sidemenu";
import { displayProfile } from "../../../store/apiPaths";
import { activeCampaigns } from "../../../store/apiPaths";

function calculateSubmissionAndDuration(
  startDate: string,
  endDate: string
): {
  submissionDate: string;
  durationInDays: number;
} {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error("Invalid date format. Use YYYY/MM/DD.");
  }

  // Calculate the submission date (20 days before start date)
  const submissionDate = new Date(start);
  submissionDate.setDate(submissionDate.getDate() - 20);

  // Calculate the campaign duration in days
  const durationInDays = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Format the submission date to YYYY/MM/DD
  const formattedSubmissionDate = submissionDate
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "/");

  return {
    submissionDate: formattedSubmissionDate,
    durationInDays,
  };
}

function calculateMaxViewsAndEarnings(followers: string): {
  maxViews: string;
  maxEarnings: string;
} {
  // Convert followers from string to number
  const numFollowers = parseFloat(followers);

  // Handle invalid input
  if (isNaN(numFollowers) || numFollowers < 0) {
    return { maxViews: "0", maxEarnings: "0" };
  }

  // Calculate maxViews and maxEarnings
  const maxViews = numFollowers * 2;
  const maxEarnings = maxViews * 0.1;

  // Convert results back to strings
  return {
    maxViews: maxViews.toString(),
    maxEarnings: maxEarnings.toString(),
  };
}

const EligibleCampaignItem = (props: any) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string>("");

  const handleOpen = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedia("");
  };
  const handleToggleDropdown = () => {
    setExpanded(!expanded);
  };

  const dates = calculateSubmissionAndDuration(
    props.start_date,
    props.end_date
  );
  console.log(dates);

  const handleCampaignResponse = async (
    influencer_status: "accepted" | "rejected"
  ) => {
    const userId = localStorage.getItem("user_id");
    const payload = {
      influencer_id: userId,
      campaign_id: props.campaign_id,
      influencer_status,
      deadline: props.deadline,
    };
    console.log(payload);
    try {
      const response = await fetch(activeCampaigns, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Campaign ${influencer_status} successfully`, data);
        alert(`Campaign ${influencer_status} successfully!`);
        navigate("/user/influencer_activecampaigns");
      } else {
        console.error("Error responding to campaign:", data);
        alert(
          `Failed to ${influencer_status} campaign: ${
            data.error || "Unknown error"
          }`
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 3,
        padding: 2,
        backgroundColor: "#f4f6f8",
        boxShadow: 2,
        marginRight: 25,
      }}
    >
      <Box
        onClick={handleToggleDropdown}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          gap: "20px",
        }}
      >
        <div className="flex justify-start gap-5">
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              //overflow: "hidden",
              // position: "absolute",
              // top: "-30px",
              // left: "50%",
              // transform: "translateX(-50%)",
              backgroundColor: "#fff",
            }}
          >
            <img
              className="rounded-full"
              src={props.brand_logo}
              alt="Brand Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures the logo fits within the circular container
              }}
            />
          </Box>
          <div className="flex flex-col gap-4">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {props.campaign_title}{" "}
              <span style={{ color: "red" }}>| Expires: {props.end_date}</span>
            </Typography>
            <Typography>{props.description}</Typography>
          </div>
        </div>
        <IconButton>{expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Section 1 */}
          <Box mb={2}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Campaign Name:</strong> {props.campaign_title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Expires On:</strong> {props.end_date}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Description:</strong> {props.description}
            </Typography>
          </Box>

          {/* Section 2 */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Timeline:</strong> {props.start_date} to{" "}
                {props.end_date}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Ad Submission Before:</strong> {props.deadline}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Ad Duration:</strong> {dates.durationInDays} days
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Number of Followers:</strong> {props.followers}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Estimated Earnings:</strong> 0.10/view upto{" "}
                {props.max.maxViews} views
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Max Earnings:</strong> {props.max.maxEarnings}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Multiple Submissions:</strong> allowed
              </Typography>
            </Box>
          </Box>

          {/* Section 3 */}
          <Box mb={2}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Campaign Assets:</strong>
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {props.campaign_assets.map((item:any, index:number) => {
                // Determine if the asset is an image or video based on the file extension
                const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(item);
                const isVideo = /\.(mp4|mov|avi|webm)$/i.test(item);

                return (
                  <Card
                    key={index}
                    sx={{
                      width: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      backgroundColor: "#e4eaf0",
                      cursor: "pointer",
                      borderRadius: "12px",
                      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      flexShrink: 0,
                    }}
                    onClick={() => handleOpen(item)} // Pass the URL to handle open
                  >
                    <CardMedia
                      component={isVideo ? "video" : "img"}
                      alt="Campaign Asset"
                      image={isImage ? item : undefined}
                      src={isVideo ? item : undefined}
                      controls={isVideo} // Show controls if it's a video
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Card>
                );
              })}
            </Box>

            {/* Modal for displaying selected media */}
            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    overflow: "hidden",
                  }}
                >
                  {selectedMedia.includes(".mp4") ? (
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    >
                      <source src={selectedMedia} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={selectedMedia}
                      alt="Selected media"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Box>
              </Fade>
            </Modal>
          </Box>

          {/* Section 4 */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box className="flex-col itms-start justify-center">
              <FormControlLabel
                control={<Checkbox color="success" />}
                label="I am comfortable with the assets"
              />
              <FormControlLabel
                control={<Checkbox color="success" />}
                label="I have read the guidelines"
              />
              <FormControlLabel
                control={<Checkbox color="success" />}
                label="I agree to the legal terms"
              />
            </Box>
          </Box>

          {/* Section 5 */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: 2 }}
              onClick={() => handleCampaignResponse("rejected")}
            >
              Reject Ad
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCampaignResponse("accepted")}
            >
              Approve Ad
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const MainView = () => {
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState();
  const [max, setMax] = useState<any>();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        //first api - to fetch campaign details
        const response = await fetch(`${eligibleCampaigns}?user_id=${userId}`);
        const data = await response.json();
        setActiveCampaigns(data.eligible_campaigns || []);

        //second api - to fetch influencer follower detail
        const follower_response = await fetch(`${displayProfile}/${userId}`);
        const follower_data = await follower_response.json();
        console.log("profile details", follower_data);
        const val = calculateMaxViewsAndEarnings(follower_data.followers);
        setMax(val);
        setFollowers(follower_data.followers);
        console.log("followers - useState", followers);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [userId]);

  return (
    <Box>
      {loading ? (
        <Typography>Loading campaigns...</Typography>
      ) : activeCampaigns.length > 0 ? (
        activeCampaigns.map((campaign:any) => (
          <EligibleCampaignItem
            key={campaign.id}
            {...campaign}
            followers={followers}
            max={max}
          />
        ))
      ) : (
        <Typography>No Eligible Campaigns</Typography>
      )}
    </Box>
  );
};

export const InfluencerApprovalHome = () => {
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
      <CampaignHeader title="Approval Page" />
      <MainView />
    </Box>
  );
};

export const InfluencerApproval = () => {
  return (
    <>
      <Header />
      <Sidemenu />
      <div id="detail">
        <InfluencerApprovalHome />
      </div>
    </>
  );
};

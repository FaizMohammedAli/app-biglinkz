import React, { useState, useEffect } from "react";
import {
  TextField,
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
import { CampaignHeader } from "../../../containers/CreateCampaign/CampaignHeader";
import { Header } from "../../../components/Header/Header";
import { Sidemenu } from "../../../components/Sidemenu/Sidemenu";
import { getactiveCampaigns } from "../../../store/apiPaths";
import { displayProfile } from "../../../store/apiPaths";
import { activeCampaigns } from "../../../store/apiPaths";
import { getpostdetails } from "../../../store/apiPaths";
import { getProfile } from "../../../store/apiPaths";

function calculateSubmissionAndDuration(
  startDate: string,
  endDate: string,
  deadline: string
): {
  durationInDays: number;
  submissionDueInHours: number; // New field for submission due in hours
} {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const Deadline = new Date(deadline);

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (
    !dateFormatRegex.test(startDate) ||
    !dateFormatRegex.test(endDate) ||
    !dateFormatRegex.test(deadline)
  ) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  // Calculate the campaign duration in days
  const durationInDays = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate the submission due in hours
  const currentTime = new Date();
  const timeDifferenceInMilliseconds =
    Deadline.getTime() - currentTime.getTime();
  const submissionDueInHours = Math.round(
    timeDifferenceInMilliseconds / (1000 * 60 * 60)
  );

  // Format the submission date to YYYY/MM/DD
  const formattedSubmissionDate = Deadline.toISOString()
    .slice(0, 10)
    .replace(/-/g, "/");

  return {
    durationInDays,
    submissionDueInHours, // Return the submission due in hours
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

const ActiveCampaignItem = (props: any) => {
  const [expanded, setExpanded] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showLegalTerms, setShowLegalTerms] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [isUrlEditable, setIsUrlEditable] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string>("");
  const [instaid, setInstaid] = useState(false);

  const handleOpen = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedia("");
  };

  useEffect(() => {
    if (props.influencerCampaign.submission_url) {
      setSubmissionUrl(props.influencerCampaign.submission_url);
    }
  }, [props.influencerCampaign.submission_url]);

  const handleToggleDropdown = () => {
    setExpanded(!expanded);
  };

  const handleToggleGuideline = () => {
    setShowGuidelines((prev) => !prev);
  };
  const toggleLegalTerms = () => setShowLegalTerms((prev) => !prev);
  const handleCheckboxChange = (event: any) =>
    setAgreeToTerms(event.target.checked);

  const dates = calculateSubmissionAndDuration(
    props.campaign.start_date,
    props.campaign.end_date,
    props.campaign.deadline
  );
  console.log(dates);

  const max = calculateMaxViewsAndEarnings(props.followers);
  const handleModify = () => setIsUrlEditable(true);

  const handleSubmitClick = async () => {
    if (submissionUrl.trim() === "") {
      alert("Submission URL cannot be empty.");
      return;
    }

    const userId = localStorage.getItem("user_id");

    try {
      // Fetch username from the submitted URL using getpostdetails API
      const postDetailsResponse = await fetch(
        `${getpostdetails}?post_url=${encodeURIComponent(submissionUrl)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!postDetailsResponse.ok) {
        alert(
          "Failed to fetch details from the submitted URL. Please try again."
        );
        return;
      }

      const { username: urlUsername } = await postDetailsResponse.json();

      // Fetch Instagram ID using getProfile API
      const profileResponse = await fetch(displayProfile + "/" + userId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        alert("Failed to fetch profile details. Please try again.");
        return;
      }

      const { insta_id: profileInstaId } = await profileResponse.json();

      // Compare the usernames
      if (urlUsername !== profileInstaId) {
        setInstaid(true);
        return;
      }

      // Prepare payload for campaign submission
      const payload = {
        influencer_id: userId,
        campaign_id: props.campaign.id,
        submission_url: submissionUrl,
      };

      // Submit to active campaigns API
      const submitResponse = await fetch(activeCampaigns, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (submitResponse.ok) {
        alert("URL submitted successfully!");
        setInstaid(false);
        setIsUrlEditable(false);
      } else {
        alert("Failed to submit URL. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An unexpected error occurred. Please try again.");
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
        }}
      >
        <div className="flex justify-start gap-5">
          <Box
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          >
            <img
              className="rounded-full"
              src={props.campaign.brand_logo}
              alt="Brand Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <div className="flex flex-col gap-4">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {props.campaign.campaign_title} |{" "}
              <span
                style={{
                  color:
                    props.influencerCampaign.campaign_status === "submissiondue"
                      ? "red"
                      : props.influencerCampaign.campaign_status === "live"
                      ? "green"
                      : props.influencerCampaign.campaign_status ===
                        "Awaitingapproval"
                      ? "yellow"
                      : props.influencerCampaign.campaign_status ===
                        "Takeaction"
                      ? "orange"
                      : "gray",
                }}
              >
                {props.influencerCampaign.campaign_status === "submissiondue"
                  ? `Submission Due in ${dates.submissionDueInHours} hours`
                  : props.influencerCampaign.campaign_status === "live"
                  ? "Live"
                  : props.influencerCampaign.campaign_status ===
                    "Awaitingapproval"
                  ? "Awaiting Approval"
                  : props.influencerCampaign.campaign_status === "Takeaction"
                  ? "Take Action"
                  : "Rejected Due to Missed Deadline"}
              </span>
            </Typography>
            <Typography>{props.campaign.description}</Typography>
            {props.campaign_status === "Takeaction" && (
              <Box
                sx={{
                  border: "1px solid",
                  padding: 2,
                  marginTop: 2,
                  borderRadius: 1,
                  backgroundColor: "#fff3e0",
                }}
              >
                <Typography sx={{ color: "black", fontStyle: "italic" }}>
                  <span className="text-orange-500"> Action Required:</span>{" "}
                  {props.status.details}
                </Typography>
              </Box>
            )}
          </div>
        </div>
        <IconButton>{expanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* Section 1 */}
          <Box mb={2}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Campaign Name:</strong> {props.campaign.campaign_title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Expires On:</strong> {props.campaign.end_date}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Description:</strong> {props.campaign.description}
            </Typography>
          </Box>

          {/* Section 2 */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Timeline:</strong> {props.campaign.start_date} to{" "}
                {props.campaign.end_date}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Ad Submission Before:</strong> {props.campaign.deadline}
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
                {max.maxViews} views
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Max Earnings:</strong> {max.maxEarnings}
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
            {/* Map through campaign_assets and display images or videos */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Array.isArray(props.campaign.campaign_assets) &&
                props.campaign.campaign_assets.map((item:any, index:number) => {
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
          <Box mb={2}>
            <Box display="flex" alignItems="center" sx={{ gap: "10px" }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Guidelines</strong>
              </Typography>
              <IconButton
                onClick={handleToggleGuideline}
                sx={{ marginBottom: "5px" }}
              >
                {showGuidelines ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            <Collapse in={showGuidelines}>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                1. Submit your entry before the deadline.
                <br />
                2. Ensure your content is original and adheres to the campaign
                theme.
                <br />
                3. Use the appropriate hashtags and tags as mentioned.
                <br />
                4. Avoid any offensive or inappropriate content.
                <br />
                5. The organizers reserve the right to disqualify any entry
                violating the terms.
              </Typography>
            </Collapse>
          </Box>

          {/* Section 5 */}
          <Box mb={2}>
            <Box display="flex" alignItems="center" sx={{ gap: "10px" }}>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <strong>Legal Terms</strong>
              </Typography>
              <IconButton
                onClick={toggleLegalTerms}
                sx={{ marginBottom: "5px" }}
              >
                {showLegalTerms ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
            <Collapse in={showLegalTerms}>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                1. By participating, you agree to grant us a royalty-free
                license to use your content.
                <br />
                2. Personal data will be handled in accordance with applicable
                privacy laws.
                <br />
                3. We are not liable for any technical issues or lost entries.
                <br />
                4. Entries violating the rules will be disqualified.
                <br />
                5. We reserve the right to cancel or modify the campaign at any
                time.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreeToTerms}
                    onChange={handleCheckboxChange}
                    name="agreeToTerms"
                    color="primary"
                  />
                }
                label="I agree to the legal terms"
                sx={{ marginTop: 2 }}
              />
            </Collapse>
          </Box>

          {/* Section 6 */}
          <Box mb={2}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Submission Url</strong>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="submission_url"
              label="Submission URL"
              required
              value={submissionUrl}
              onChange={(e) => setSubmissionUrl(e.target.value)}
              disabled={!isUrlEditable}
              sx={{ mb: 2 }}
            />
            {instaid && (
              <Typography className="text-red-500">
                *The submitted post is not from your Insta Id
              </Typography>
            )}
          </Box>

          {/* Section 7 */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: 2 }}
              onClick={handleModify}
            >
              Modify Ad
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!isUrlEditable || !submissionUrl}
              onClick={handleSubmitClick}
            >
              Submit Ad
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const MainView = () => {
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [influencerCampaigns, setInfluencerCampaigns] = useState([]);
  const [final, setFinal] = useState([]);
  const [followers, setFollowers] = useState();
  const [loading, setLoading] = useState(false);
  const [max, setMax] = React.useState<any>();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        // First API - to fetch campaign details
        const response = await fetch(`${getactiveCampaigns}?user_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("data", data);

          const fetchedActiveCampaigns = data.campaigns || [];
          const fetchedInfluencerCampaigns = data.influencer_campaigns || [];

          setActiveCampaigns(fetchedActiveCampaigns);
          setInfluencerCampaigns(fetchedInfluencerCampaigns);

          // Combine activeCampaigns and influencerCampaigns
          const combinedData = fetchedActiveCampaigns.map((campaign:any) => {
            const matchingInfluencerCampaign = fetchedInfluencerCampaigns.find(
              (infCamp:any) => infCamp.campaign_id === campaign.id?.toString()
            );
            return {
              campaign,
              influencerCampaign: matchingInfluencerCampaign || null, // Explicitly set null if no match
            };
          });
          setFinal(combinedData);
          console.log("combined data", combinedData);
        } else {
          console.error("Failed to fetch campaigns:", response.statusText);
        }

        // Second API - to fetch influencer follower details
        const follower_response = await fetch(`${displayProfile}/${userId}`);
        if (follower_response.ok) {
          const follower_data = await follower_response.json();
          const val = calculateMaxViewsAndEarnings(follower_data.followers);
          setMax(val);
          setFollowers(follower_data.followers);
        } else {
          console.error(
            "Failed to fetch profile details: ",
            follower_response.statusText
          );
        }
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
      ) : final.length > 0 ? (
        final.map((campaign:any) => (
          <ActiveCampaignItem
            key={campaign.id}
            followers={followers}
            max={max}
            {...campaign}
          />
        ))
      ) : (
        <Typography>No Active Campaigns</Typography>
      )}
    </Box>
  );
};

export const InfluencerActiveCampaignHome = () => {
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
      <CampaignHeader title="Active Campaigns" />
      <MainView />
    </Box>
  );
};

export const InfluencerActiveCampaign = () => {
  return (
    <>
      <Header />
      <Sidemenu />
      <div id="detail">
        <InfluencerActiveCampaignHome />
      </div>
    </>
  );
};

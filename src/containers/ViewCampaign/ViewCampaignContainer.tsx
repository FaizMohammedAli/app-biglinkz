import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ViewCampaignHeader } from "./../ViewCampaign/ViewCampaignHeader";
import { ViewCampaignMetrics } from "./ViewCampaignMetrics";
import { ViewCampaignMedia } from "./ViewCampaignMedia";
import { ViewCampaignBudget } from "./ViewCampaignBudget";
import { ViewCampaignInfluencers } from "./ViewCampaignInfluencers";
import { Box, Toolbar, ThemeProvider } from "@mui/material";
import Divider from "@mui/material/Divider";
import { getcampaigns } from "../../store/apiPaths";
import { getInfluencerCampaigns } from "../../store/apiPaths";

export const ViewCampaignContainer = (props: any) => {
  //const [InfluencerList, setinfluencerList] = React.useState(data);
  const [individualCampaign, setIndividualCampaign] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [influencers, setInfluencers] = React.useState<any[]>([]);
  const { id } = useParams();
  console.log("campaign_id", id);

  useEffect(() => {
    const fetchCampaignsAndInfluencers = async () => {
      const userId = localStorage.getItem("user_id");
      console.log("User ID from localStorage:", userId);
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
        const campaignResponse = await fetch(
          `${getcampaigns}?user_id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Campaign Response status:", campaignResponse.status);

        if (campaignResponse.ok) {
          const campaignData = await campaignResponse.json();
          console.log("Campaigns fetched:", campaignData.campaigns);

          // Find the specific campaign if campaignId is provided
          if (id) {
            const selectedCampaign = campaignData.campaigns.find(
              (c:any) => String(c.campaign_id) === String(id)
            );
            console.log("Selected campaign:", selectedCampaign);
            setIndividualCampaign(selectedCampaign || null);

            if (!selectedCampaign) {
              setError("Campaign not found");
              setLoading(false);
              return;
            }

            // Fetch influencers for the selected campaign
            try {
              console.log(
                "Fetching influencers from:",
                `${getInfluencerCampaigns}?campaign_id=${id}`
              );
              const influencerResponse = await fetch(
                `${getInfluencerCampaigns}?campaign_id=${id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              console.log(
                "Influencer Response status:",
                influencerResponse.status
              );

              if (influencerResponse.ok) {
                const influencerData = await influencerResponse.json();
                console.log("Influencers fetched:", influencerData.influencers);
                setInfluencers(influencerData.influencers || []);
              } else {
                console.error(
                  "Failed to fetch influencers:",
                  influencerResponse.statusText
                );
                setError("Failed to fetch influencers");
              }
            } catch (influencerError) {
              console.error("Error during influencer fetch:", influencerError);
              setError("An error occurred while fetching influencers.");
            }
          }
        } else {
          console.error(
            "Failed to fetch campaigns:",
            campaignResponse.statusText
          );
          setError("Failed to fetch campaigns");
        }
      } catch (error) {
        console.error("Error during campaign fetch:", error);
        setError("An error occurred while fetching campaigns.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignsAndInfluencers();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-[200px] ml-[200px] text-xl font-semibold">
        Loading campaign details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-[200px] ml-[200px] text-xl font-semibold">{error}</div>
    );
  }

  return (
    <Box
      sx={{
        marginleft: "250px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <ViewCampaignHeader data={individualCampaign} />
      <Divider />
      <ViewCampaignMetrics data={individualCampaign} />
      <Divider />
      <ViewCampaignMedia data={individualCampaign} />
      <Divider />
      <ViewCampaignInfluencers data={influencers} />
      <Divider />
      <ViewCampaignBudget />
    </Box>
  );
};

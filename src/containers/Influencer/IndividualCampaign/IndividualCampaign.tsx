import React from "react";
import { ViewIndividualCampaignHeader } from "./IndividualCampaignHeader";

import { Box, Toolbar, ThemeProvider } from "@mui/material";
import Divider from "@mui/material/Divider";
import { IndividualCampaignInfo } from "./IndividualCampaignInfo";
import { IndividualCampaignContact } from "./IndividualCampaignContact";
import { IndividualCampaignFooter } from "./IndividualCampaignFooter";

const campaigndata = {
  id: "123",
  title: "Bikers Campaign",
  brandName: "Bikers",
  category: "Automobiles",
  target: "Above 50K",
  caption:
    "Feel the power, conquer the roads, and embrace the adventure with the all-new X2000 from @ThunderRidesOfficial.From city streets to rugged terrains, this bike is your ultimate partner in thrill and style.Tag us in your adventures and show the world your ride!",
  location: "Chennai",
  duration: "Nov 15–Dec 15, 2024",
  hashtags: "#bike #RoyalEnfield",
  mentions: "@Bikers",
  status: "Active",
  goals: "Increase Brand Visibility",
  type: "Instagram Post",
  images: [
    "https://ik.imagekit.io/zcdsz07ad/BigLinkz/pexels-nicholas-dias-1119542-2116475.jpg?updatedAt=1733161979542",
    "https://ik.imagekit.io/zcdsz07ad/BigLinkz/pexels-giorgio-de-angelis-482403-1413412.jpg?updatedAt=1733162063253",
  ],

  videos: [
    "https://ik.imagekit.io/zcdsz07ad/BigLinkz/5198957-uhd_2160_4096_25fps.mp4?updatedAt=1733161803138",
    "https://ik.imagekit.io/zcdsz07ad/BigLinkz/5199360-uhd_2160_4096_25fps.mp4?updatedAt=1733166043470",
  ],

  payment: "₹25,000 per post",
  reward: "Free merchandise (riding gear, branded jackets)",
  campaign_manager: "Mr Ram",
  business_email: "bikers@gmail.com",
  brand_website: "www.bikers.com",
  contact_number: "+91 2235433468",
};
export const IndividualCampaign = () => {
  const [individualdata] = React.useState(campaigndata);

  return (
    <Box
      sx={{
        marginleft: "250px",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        gap: "40px",
      }}
    >
      <ViewIndividualCampaignHeader data={individualdata} />
      <Divider />
      <IndividualCampaignInfo data={individualdata} />
      <IndividualCampaignContact data={individualdata} />
      <IndividualCampaignFooter />
    </Box>
  );
};

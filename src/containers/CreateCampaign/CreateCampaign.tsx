import React from "react";
import { Box, FormControl, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CampaignStepper } from "./CampaignStepper";
import { CampaignNavigationFooter } from "./CampaignNavigationFooter";
import { CampaignHeader } from "./CampaignHeader";
import { CreateCampaignPages } from "./CreateCampaignPages";
import { campaigndetails } from "../../store/apiPaths";
import "./campaign.scss";

const steps = [
  "Brand Info",
  "Content Info",
  "Influencer Info",
  "Campaign Info",
  "Review",
];

export const CreateCampaign = (props: any) => {
  const navigate = useNavigate();
  // Initialize state with all fields
  const [campaignFormValues, setCampaignFormValues] = React.useState<any>({
    brand_name: "",
    brand_instagram_id: "",
    product: "",
    website: "",
    email: "",
    caption: "",
    hashtag: "",
    tags: "",
    content_type: "",
    target_followers: "",
    influencer_gender: "",
    influencer_location: "",
    campaign_title: "",
    target_reach: "",
    budget: "",
    goal: "",
    manager_name: "",
    contact_number: "",
    rewards: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [activeStep, setActiveStep] = React.useState(0);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignFormValues({
      ...campaignFormValues,
      [e.target.name]: e.target.value, // Update the specific field
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Create FormData object to handle files and text data together
    const formData = new FormData();

    // Append all form fields to FormData
    Object.keys(campaignFormValues).forEach((key) => {
      if (key !== "campaign_assets" && key !== "brand_logo") {
        formData.append(key, campaignFormValues[key]);
      }
    });

    // Append files to FormData
    if (campaignFormValues.brand_logo) {
      formData.append("brand_logo", campaignFormValues.brand_logo);
    }

    console.log("campaignFormValues.campaign_assets", campaignFormValues);
    if (campaignFormValues.campaign_assets) {
      formData.append("campaign_assets", campaignFormValues.campaign_assets); // Assuming single file for simplicity
    }

    try {
      const response = await fetch(campaigndetails, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Campaign created successfully", data);
        navigate("/user/my-campaigns");
      } else {
        console.error("Error creating campaign:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: "250px",
      }}
    >
      <Toolbar />
      <CampaignHeader title={"Create Campaign"} />
      <div
        style={{
          border: "1px solid magenta",
          padding: "20px",
          borderRadius: "10px",
          width: "70%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <CampaignStepper steps={steps} activeStep={activeStep} />
        <Box
          component="form"
          className="campaign-form"
          sx={{ width: "100%", height: "100%" }}
          onSubmit={handleSubmit} // Attach handleSubmit to form's submit event
        >
          <FormControl>
            <CreateCampaignPages
              onChange={handleInputChange}
              formValues={campaignFormValues}
              setFormValues={setCampaignFormValues}
              activeStep={activeStep}
            />
          </FormControl>
        </Box>
        <CampaignNavigationFooter
          onChange={setActiveStep}
          onSubmit={handleSubmit} // Ensure the onSubmit prop is working
          activeStep={activeStep}
          totalSteps={steps.length}
        />
      </div>
    </Box>
  );
};

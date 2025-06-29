import { Toolbar } from "@mui/material";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { CreateCampaign } from "../containers/CreateCampaign/CreateCampaign";
import { Dashboard, DashboardHome } from "../containers/Dashboard/Dashboard";
import { HomeContainer } from "../containers/Home/HomeContainer";
import { Login } from "../containers/Login/LoginContainer";
import { MyCampaigns } from "../containers/MyCampaigns/MyCampaigns";
import { ViewCampaignContainer } from "../containers/ViewCampaign/ViewCampaignContainer";
//import { SignUpForm } from "../containers/Login/Signup";
import { Signup } from "../containers/Login/SignupContainer";
import { InfluencerDashboardHome } from "../containers/Influencer/InfluencerDashboard/InfluencerDashboard";
import { IndividualCampaign } from "../containers/Influencer/IndividualCampaign/IndividualCampaign";
import { InfluencerProfile } from "../containers/MyProfile/InfluencerProfile";
import { InfluencerApproval } from "../containers/Influencer/InfluencerApproval/InfluencerApproval";
import { InfluencerActiveCampaign } from "../containers/Influencer/InfluencerActiveCampaigns/InfluencerActiveCampaigns";
import { InfluencerPastCampaign } from "../containers/Influencer/InfluencerPastCampaign/InfluencerPastCampaign";
import { NotificationsContainer } from "../containers/Notifications/NotificationsContainer";
import { BusinessProfile } from "../containers/MyProfile/BusinessProfile";
import { BusinessPayment } from "../containers/Payments/BusinessPayment";
import { InfluencerPayment } from "../containers/Payments/InfluencerPayment";
import { Password } from "../containers/Payments/Password";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />,
  },
  {
    path: "/login",
    Component: Login,
    caseSensitive: true,
  },
  {
    path: "/signup",
    Component: Signup,
    caseSensitive: true,
  },
  {
    path: "/user",
    caseSensitive: true,
    Component: Dashboard,
    children: [
      {
        path: "business",
        element: <DashboardHome />,
        caseSensitive: true,
      },
      {
        path: "influencer",
        element: <InfluencerDashboardHome />,
        caseSensitive: true,
        children: [],
      },
      {
        path: "approvalPage",
        element: <InfluencerApproval />,
        caseSensitive: true,
      },
      {
        path: "new-campaign",
        element: <CreateCampaign />,
        caseSensitive: true,
      },
      {
        path: "my-campaigns",
        element: <MyCampaigns />,
        caseSensitive: true,
      },
      {
        path: "campaign/:id",
        element: <ViewCampaignContainer />,
        caseSensitive: true,
      },
      {
        path: "eligiblecampaign/:id",
        element: <IndividualCampaign />,
        caseSensitive: true,
      },
      {
        path: "my-profile",
        element: <InfluencerProfile />,
        caseSensitive: true,
      },
      {
        path: "influencer_activecampaigns",
        element: <InfluencerActiveCampaign />,
        caseSensitive: true,
      },
      {
        path: "influencer_pastcampaigns",
        element: <InfluencerPastCampaign />,
        caseSensitive: true,
      },
      {
        path: "notifications",
        element: <NotificationsContainer />,
        caseSensitive: true,
      },
      {
        path: "businessProfile",
        element: <BusinessProfile />,
        caseSensitive: true,
      },
      {
        path: "businessPayment",
        element: <BusinessPayment />,
        caseSensitive: true,
      },
      {
        path: "influencerPayment",
        element: <InfluencerPayment />,
        caseSensitive: true,
      },
      {
        path: "Password",
        element: <Password />,
        caseSensitive: true,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};

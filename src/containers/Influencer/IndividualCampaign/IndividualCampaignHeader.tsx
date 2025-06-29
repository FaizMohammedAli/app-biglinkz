import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const ViewIndividualCampaignHeader = (props: any) => {
  return (
    <Box
      sx={{
        marginTop: "50px",
        marginLeft: "200px",
        paddingLeft: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "",
      }}
    >
      {/* First Line: Title */}
      <Typography
        variant="h4"
        sx={{
          color: "primary.dark",
          textAlign: "center",
          marginBottom: "20px",
        }}
        className="font-bold"
      >
        {props.data.title}
      </Typography>

      {/* Second Line: Caption and Status */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary" }}
          className="font-semibold"
        >
          {props.data.brandName}
        </Typography>
        <Chip
          label={props.data.status}
          sx={{
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            borderRadius: "16px",
          }}
        />
      </Box>

      {/* Third Line: Remaining Content */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row", // Stacks items vertically
          alignItems: "center", // Centers items row-wise
          gap: "20px", // Adds space between each row
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FlagIcon sx={{ color: "primary.main" }} fontSize="large" />
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {props.data.target}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LocationOnIcon sx={{ color: "primary.main" }} fontSize="large" />
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {props.data.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AccessTimeIcon sx={{ color: "primary.main" }} fontSize="large" />
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {props.data.duration}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AttachMoneyIcon sx={{ color: "primary.main" }} fontSize="large" />
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {props.data.goals}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

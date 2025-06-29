import { Box, Typography } from "@mui/material";
import { Person, Email, Phone } from "@mui/icons-material"; // Importing Material-UI Icons

export const IndividualCampaignContact = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        gap: 5,
        padding: 3,
        marginLeft: "250px",
        width: "calc(100% - 250px)",
        textAlign: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Campaign Manager */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "33%",
          backgroundColor: "#e3f2fd",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Person sx={{ fontSize: 30, color: "#1976d2", marginBottom: 1 }} />{" "}
        {/* Campaign Manager Icon */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Consistent text size
            fontWeight: 700,
            color: "#1976d2", // Blue color for heading
            marginBottom: 1, // Space below heading
          }}
        >
          Campaign Manager
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem", // Consistent text size
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          {props.data.campaign_manager}
        </Typography>
      </Box>

      {/* Business Email */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Arrange heading and value vertically
          alignItems: "center",
          width: "33%", // Ensure columns take up equal width
          backgroundColor: "#e3f2fd", // Light green background for each section
          padding: 2,
          borderRadius: 2, // Rounded corners for each section
        }}
      >
        <Email sx={{ fontSize: 30, color: "#388e3c", marginBottom: 1 }} />{" "}
        {/* Business Email Icon */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Consistent text size
            fontWeight: 700,
            color: "#388e3c", // Green color for heading
            marginBottom: 1, // Space below heading
          }}
        >
          Business Email
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem", // Consistent text size
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          {props.data.business_email}
        </Typography>
      </Box>

      {/* Contact Number */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Arrange heading and value vertically
          alignItems: "center",
          width: "33%", // Ensure columns take up equal width
          backgroundColor: "#e3f2fd", // Light orange background for each section
          padding: 2,
          borderRadius: 2, // Rounded corners for each section
        }}
      >
        <Phone sx={{ fontSize: 30, color: "#f57c00", marginBottom: 1 }} />{" "}
        {/* Contact Number Icon */}
        <Typography
          sx={{
            fontSize: "1.25rem", // Consistent text size
            fontWeight: 700,
            color: "#f57c00", // Orange color for heading
            marginBottom: 1, // Space below heading
          }}
        >
          Contact Number
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem", // Consistent text size
            fontWeight: 500,
            color: "text.secondary",
          }}
        >
          {props.data.contact_number}
        </Typography>
      </Box>
    </Box>
  );
};

import { Box, Button } from "@mui/material";

export const IndividualCampaignFooter = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 2,
        gap: 2,
        position: "relative",
        zIndex: 10,
        backgroundColor: "background.paper", // Optional, for clarity
        width: "100%", // Ensure the container spans the full width
      }}
    >
      <Button
        type="button"
        variant="contained"
        sx={{
          marginLeft: "250px", // Offset from the left
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "white",
          height: "50px", // Uniform height
          fontSize: "1.25rem", // Larger text size
          fontWeight: "bold",
          flex: 1, // Makes the button take up all available space
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Accept
      </Button>
      <Button
        type="button"
        variant="contained"
        sx={{
          textAlign: "center",
          backgroundColor: "secondary.main",
          color: "white",
          height: "50px",
          fontSize: "1.25rem",
          fontWeight: "bold",
          flex: 1, // Makes the button take up all available space
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        Reject
      </Button>
    </Box>
  );
};

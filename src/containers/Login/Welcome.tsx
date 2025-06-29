import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";

export const Welcome = (props: any) => {
  return (
    <Box
      sx={{
        flex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        p: 4,
        backgroundImage:
          "url('https://ik.imagekit.io/mino2112/biglinkz%20intern/purple-and-blue-background-1280-x-800-ajp62v7qahujohnv.jpg?updatedAt=1732426097312')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
        color={"primary.contrastText"}
        sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
      >
        Welcome to BigLinkz
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        color={"primary.contrastText"}
        fontWeight="bold"
        sx={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
      >
        Automate Your Influencer Marketing: From Influencer Selection to Budget
        Calculation and Outreach.
      </Typography>
    </Box>
  );
};

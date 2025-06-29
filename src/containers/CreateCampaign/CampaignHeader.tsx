import React from "react";
import { Box, Typography, Card, Toolbar } from "@mui/material";
export const CampaignHeader = (props: any) => {
  return (
    <>
      <Box component={"div"} style={{ marginBottom: "10px" }}>
        <Typography
          style={{ fontWeight: "bold" }}
          variant="h5"
          color={"text.primary"}
        >
          {props.title}
        </Typography>
      </Box>
    </>
  );
};

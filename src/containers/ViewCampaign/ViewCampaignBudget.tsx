import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
} from "@mui/material";

export const ViewCampaignBudget = (props: any) => {
  const budget = {
    cost: [
      {
        category: "Influencers",
        breakdown: [
          {
            type: "Nano Influencers (1K–10K)",
            ratePerInfluencer: "₹5,000",
            totalAllotted: "₹50,000",
            influencersCount: 10,
          },
          {
            type: "Micro Influencers (10K–50K)",
            ratePerInfluencer: "₹15,000",
            totalAllotted: "₹1,50,000",
            influencersCount: 10,
          },
          {
            type: "Mid-Tier Influencers (50K–500K)",
            ratePerInfluencer: "₹50,000",
            totalAllotted: "₹2,50,000",
            influencersCount: 5,
          },
          {
            type: "Macro Influencers (500K+)",
            ratePerInfluencer: "₹1,00,000",
            totalAllotted: "₹3,00,000",
            influencersCount: 3,
          },
        ],
        total: "₹7,50,000", // Total influencer budget
      },
      {
        category: "Media",
        description:
          "Costs for  video production, photo shoots, graphic design, and editing.",
        breakdown: [
          {
            type: "Video Production",
            description:
              "Creating promotional or campaign-specific video content, including scripting, shooting, and editing.",
            total: "₹50,000",
          },
          {
            type: "Photo Shoots",
            description:
              "Professional photography for campaign visuals, influencer shoots, and product branding.",
            total: "₹30,000",
          },
          {
            type: "Graphic Design",
            description:
              "Designing banners, posters, and creatives for social media and campaign branding.",
            total: "₹20,000",
          },
          {
            type: "Post-Production Editing",
            description:
              "Editing videos, photos, and other campaign assets for final publishing.",
            total: "₹20,000",
          },
        ],
        total: "₹2,00,000",
      },
      {
        category: "Giveaways",
        description:
          "Costs for items to be given away during the campaign, including product samples, swag, or promotional merchandise.",
        total: "₹50,000",
      },
    ],
  };

  // Check if the data is available
  if (!budget || !budget.cost || budget.cost.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          marginLeft: "250px",
          marginTop: "20px",
          fontSize: "18px",
          color: "#888",
        }}
      >
        No budget data available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        marginTop: "40px",
        marginLeft: "200px",
        padding: "20px",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          color: "#2F289C",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Campaign Budget Breakdown
      </Typography>

      {budget.cost.map((category: any, index: number) => (
        <Box key={index} sx={{ marginBottom: "30px" }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "10px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {category.category}
          </Typography>

          {category.description && (
            <Typography
              variant="body2"
              sx={{
                marginBottom: "15px",
                color: "#555",
                fontStyle: "italic",
              }}
            >
              {category.description}
            </Typography>
          )}

          <Paper
            sx={{
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: "80%" }}>
              <TableBody>
                {category.breakdown &&
                  category.breakdown.map((item: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell sx={{ fontWeight: "bold", color: "#555" }}>
                        {item.type}
                      </TableCell>

                      {item.ratePerInfluencer && (
                        <TableCell sx={{ color: "#333" }}>
                          Rate Per Influencer: {item.ratePerInfluencer}
                        </TableCell>
                      )}

                      {item.influencersCount && (
                        <TableCell sx={{ color: "#333" }}>
                          Count: {item.influencersCount}
                        </TableCell>
                      )}

                      <TableCell
                        sx={{
                          color: "#2F289C",
                          fontWeight: "bold",
                          textAlign: "right",
                        }}
                      >
                        Total: {item.totalAllotted || item.total}
                      </TableCell>
                    </TableRow>
                  ))}

                <TableRow sx={{ fontWeight: "bold" }}>
                  <TableCell sx={{ fontSize: "16px" }}>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell colSpan={3} sx={{ fontSize: "16px" }}>
                    <strong>{category.total}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Box>
      ))}

      <Divider sx={{ marginY: "20px" }} />

      <Typography
        variant="h6"
        sx={{
          textAlign: "right",
          color: "#2F289C",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      ></Typography>
    </Box>
  );
};

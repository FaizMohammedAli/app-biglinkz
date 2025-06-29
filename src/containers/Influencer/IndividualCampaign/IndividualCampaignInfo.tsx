import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Fade,
  Backdrop,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";

export const IndividualCampaignInfo = (props: any) => {
  const [open, setOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string>("");

  const handleOpen = (mediaUrl: string) => {
    setSelectedMedia(mediaUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMedia("");
  };

  // Separate details for the left and right sections
  const leftDetails = [
    { label: "Caption", value: props.data.caption, image: "NotesIcon" },
    { label: "Hashtags", value: props.data.hashtags, image: "" },
    { label: "Type", value: props.data.type, image: "" },
    { label: "Mentions", value: props.data.mentions, image: "" },
    { label: "Category", value: props.data.category, image: "" },
  ];

  const rightDetails = [
    { label: "Payment", value: props.data.payment },
    { label: "Reward", value: props.data.reward },
  ];

  const mediaAssets = [...props.data.images, ...props.data.videos];

  return (
    <Box
      sx={{
        marginLeft: { xs: "20px", sm: "150px", md: "250px" },
        padding: "20px",
      }}
    >
      {/* Combined Table for Campaign Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "40px",
          padding: "20px",
          backgroundColor: "#e4eaf0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        {/* Left Section */}
        <Table
          sx={{
            flex: 1,
            borderRight: {
              xs: "none",
              md: "1px solid",
              borderColor: "divider",
            },
            paddingRight: { xs: "0", md: "20px" },
          }}
        >
          <TableBody>
            {leftDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    display: "flex",
                    gap: "10px",
                  }}
                  className="text-xl font-semibold"
                >
                  {detail.label}
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    wordWrap: "break-word",
                  }}
                >
                  {detail.value || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Right Section */}
        <Table
          sx={{
            flex: 1,
            paddingLeft: { xs: "0", md: "20px" },
            marginTop: { xs: "20px", md: "0" },
          }}
        >
          <TableBody>
            {rightDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    width: "50%",
                  }}
                >
                  {detail.label}
                </TableCell>
                <TableCell
                  sx={{
                    color: "text.secondary",
                    wordWrap: "break-word",
                  }}
                >
                  {detail.value || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {/* Campaign Media Section */}
      <Box
        sx={{
          marginTop: "40px",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#e4eaf0",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold",
            color: "#2F289C",
          }}
        >
          Campaign Media
        </Typography>

        {/* Horizontal Scroll Container */}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            paddingBottom: "20px",
            flexWrap: "nowrap",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {mediaAssets.map((asset, index) => (
            <Card
              key={index}
              sx={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#ffffff",
                cursor: "pointer",
                borderRadius: "12px",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                flexShrink: 0,
              }}
              onClick={() => handleOpen(asset)}
            >
              {asset.includes(".mp4") ? (
                <CardMedia
                  component="video"
                  controls
                  src={asset}
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  alt="Campaign media"
                  image={asset}
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Card>
          ))}
        </Box>

        {/* Modal for displaying selected media */}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                maxWidth: "90%",
                maxHeight: "90%",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {selectedMedia.includes(".mp4") ? (
                <video
                  controls
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    width: "auto",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                >
                  <source src={selectedMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMedia}
                  alt="Selected media"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";

export const ViewCampaignMedia = (props: any) => {
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

  return (
    <Box
      sx={{
        marginTop: "40px",
        marginLeft: "200px",
        padding: "20px",
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
          marginX: "auto",
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
        {Array.isArray(props.data.campaign_assets) &&
          props.data.campaign_assets.map((item:any) => {
            // Determine if the asset is an image or video based on the file extension
            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(item); // Regex to check for image extensions
            const isVideo = /\.(mp4|mov|avi|webm)$/i.test(item); // Regex to check for video extensions

            return (
              <Card
                key={item}
                sx={{
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  backgroundColor: "#e4eaf0",
                  cursor: "pointer",
                  borderRadius: "12px",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  flexShrink: 0,
                }}
                onClick={() => handleOpen(item)} // Pass the URL to handle open
              >
                <CardMedia
                  component={isVideo ? "video" : "img"}
                  alt="Campaign Asset"
                  image={isImage ? item : undefined}
                  src={isVideo ? item : undefined}
                  controls={isVideo} // Show controls if it's a video
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Card>
            );
          })}
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
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "hidden",
            }}
          >
            {selectedMedia.includes(".mp4") ? (
              <video
                controls
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
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
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

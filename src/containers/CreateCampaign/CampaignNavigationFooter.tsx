import React from "react";
import { Box, Card, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoneIcon from "@mui/icons-material/Done";
import DialogActions from "@mui/material/DialogActions";
export const CampaignNavigationFooter = (props: any) => {
  const handlePrev = () => {
    props.onChange((prev: any) => prev - 1);
  };

  const handleNext = () => {
    props.onChange((prev: any) => prev + 1);
  };

  const handleSubmit = () => {
    props.onSubmit();
  };

  return (
    <Box component={"div"}>
      <DialogActions>
        {props.activeStep !== 0 && (
          <Button
            variant="contained"
            type="button"
            color="secondary"
            startIcon={<ArrowBackIosIcon />}
            name="prev"
            onClick={handlePrev}
          >
            Previous{" "}
          </Button>
        )}
        {props.activeStep !== props.totalSteps - 1 && (
          <Button
            variant="contained"
            type="button"
            color="primary"
            name="next"
            onClick={handleNext}
            endIcon={<ArrowForwardIosIcon />}
          >
            Next{" "}
          </Button>
        )}
        {props.activeStep === props.totalSteps - 1 && (
          <Button
            variant="contained"
            color="success"
            type="button"
            name="submitBtn"
            endIcon={<DoneIcon />}
            onClick={handleSubmit}
          >
            Submit{" "}
          </Button>
        )}
      </DialogActions>
    </Box>
  );
};

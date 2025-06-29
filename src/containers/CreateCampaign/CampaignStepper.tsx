import React from "react";
import { Box, Stepper, Step, StepLabel, StepIconProps } from "@mui/material";

export const CampaignStepper = (props: any) => {
  return (
    <Box component="div">
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {props.steps.map((label: any, index: number) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

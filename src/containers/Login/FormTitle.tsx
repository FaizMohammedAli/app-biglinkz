import React from "react";
import { Typography } from "@mui/material";

interface IFormTitle {
  title: string;
}
export const FormTitle = (props: IFormTitle) => {
  return (
    <Typography
      variant="h5"
      fontWeight="bold"
      color={"primary"}
      textAlign="center"
      gutterBottom
    >
      {props.title}
    </Typography>
  );
};

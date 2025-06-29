import React from "react";
import {
  Box,
  FormControl,
  Input,
  TextField,
  Toolbar,
  Typography,
  Stepper,
  Divider,
  Button,
  Step,
  StepLabel,
} from "@mui/material";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./login.scss";
import { SignUpForm } from "./Signup";
import { LoginForm } from "./Login";
import { Welcome } from "./Welcome";
import { ToggleUserForm } from "./ToggleUserForm";

export const Login = (props: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState<boolean>(true);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100%",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Welcome />
      <ToggleUserForm showLogin={showLogin} setShowLogin={setShowLogin} />
    </Box>
  );
};

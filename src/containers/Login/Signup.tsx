import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { FormTitle } from "./FormTitle";
import { signupAPI } from "../../store/apiPaths";

export interface ISignUpFormFields {
  email: string;
  password: string;
  confirmPassword: string;
  accountType?: string;
}

export const formFieldsInitialState = {
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "",
};

export const SignUpForm = (props: any) => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = React.useState<ISignUpFormFields>(
    formFieldsInitialState
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.value) {
      setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleToggleBtnChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setFormFields({
      ...formFields,
      accountType: newAlignment,
    });
  };
  const handleSubmitClick = async () => {
    console.log("entered data:", formFields);
    if (
      !formFields.email ||
      !formFields.password ||
      !formFields.confirmPassword ||
      !formFields.accountType
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (formFields.password !== formFields.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(signupAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formFields.email,
          password: formFields.password,
          confirmPassword: formFields.confirmPassword,
          type: formFields.accountType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user_id", data.user.user_id);
        localStorage.setItem("accountType", data.user.type);
        const userId = localStorage.getItem("user_id");

        setErrorMessage(null);
        if (formFields.accountType == "business") {
          navigate("/user/business");
        } else {
          navigate("/user/my-profile");
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "An unknown error occurred.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <FormTitle title="Create New Account" />
      <TextField
        fullWidth
        variant="outlined"
        name="email"
        label="Email Address"
        required
        sx={{ mb: 2 }}
        onChange={handleFormChange}
      />
      <ToggleButtonGroup
        color="primary"
        value={formFields.accountType}
        exclusive
        onChange={handleToggleBtnChange}
        aria-label="Platform"
        fullWidth
        sx={{ mb: 2 }}
      >
        <ToggleButton color="primary" value="business">
          Business
        </ToggleButton>
        <ToggleButton color="secondary" value="influencer">
          Influencer
        </ToggleButton>
      </ToggleButtonGroup>
      <TextField
        fullWidth
        variant="outlined"
        name="password"
        type="password"
        label="Password"
        required
        sx={{ mb: 2 }}
        onChange={handleFormChange}
      />
      <TextField
        fullWidth
        variant="outlined"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        required
        sx={{ mb: 2 }}
        onChange={handleFormChange}
      />
      {errorMessage && (
        <Typography className="text-red-600 font-bold text-center text-[13px]  mb-2">
          {errorMessage}
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleSubmitClick}
      >
        Register
      </Button>
      <Typography variant="subtitle2" textAlign="center">
        <span
          onClick={() => props.onShowLogin(true)}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          Existing User? Click here to Login
        </span>
      </Typography>
    </Box>
  );
};

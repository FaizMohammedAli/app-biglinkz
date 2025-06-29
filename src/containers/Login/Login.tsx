import React, { useImperativeHandle } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../store/apiPaths";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import { formFieldsInitialState, ISignUpFormFields } from "./Signup";

export const LoginForm = (props: any) => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = React.useState(false);
  const [formFields, setFormFields] = React.useState<ISignUpFormFields>(
    formFieldsInitialState
  );
  const [error, setError] = React.useState(false);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.value) {
      setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleShowSignupClick = () => {
    props.onShowLogin(false);
  };

  const handleLoginClick = async () => {
    if (formFields.email && formFields.password) {
      setError(false);
      setShowLoader(true);
      try {
        const response = await fetch(loginAPI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formFields.email,
            password: formFields.password,
          }),
        });
        console.log("response", response);
        if (response.ok) {
          setShowLoader(false);
          const data = await response.json();
          console.log(data);
          localStorage.setItem("accountType", data.user.type);
          localStorage.setItem("user_id", data.user.user_id);
          const userId = localStorage.getItem("user_id");
          //console.log("Response data:", data);
          console.log("User_id from login", userId);
          setError(false);

          if (data.user.type == "influencer") {
            navigate("/user/influencer");
          } else {
            navigate("/user/business");
          }

          console.log("successful login");
        } else {
          setShowLoader(false);
          setError(true);
          console.log("Unsuccessful login");
        }
      } catch (error) {
        setShowLoader(false);
        console.error("Login error:", error);

        if (error instanceof TypeError) {
          console.error("Network error or CORS issue:", error);
        }
        setError(true);
      }
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
      <Typography
        variant="h5"
        fontWeight="bold"
        color={"primary"}
        textAlign="center"
        gutterBottom
      >
        Login to BigLinkz
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name="email"
        label="Email Address"
        required
        sx={{ mb: 2 }}
        onChange={handleFormChange}
      />
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
      {error && (
        <Typography className="text-red-600 font-bold text-center text-[13px]  mb-2">
          OOPS! Incorrect Email or Password. Try Again
        </Typography>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        disabled={showLoader}
        onClick={handleLoginClick}
        // startIcon={<Lo}
      >
        {showLoader ? (
          <span>
            {" "}
            Login <CircularProgress size="30px" />
          </span>
        ) : (
          "Login"
        )}
      </Button>
      <Button
        variant="contained"
        fullWidth
        color="secondary"
        startIcon={<GoogleIcon />}
        sx={{ mb: 2 }}
      >
        Login with Google
      </Button>

      <Typography variant="subtitle2" textAlign="center">
        <span
          onClick={handleShowSignupClick}
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          New to BigLinkz? Create Account
        </span>
      </Typography>
    </Box>
  );
};

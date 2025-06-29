import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Password = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the password has been set (via localStorage or API)
    const passwordSet = localStorage.getItem("isPasswordSet");
    setIsFirstTime(!passwordSet);
  }, []);

  const handleSubmit = async () => {
    setError("");

    if (isFirstTime) {
      // First-time setup: check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      // Call backend API to save the password
      try {
        const response = await fetch("/api/set-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          localStorage.setItem("isPasswordSet", "true");
          alert("Password set successfully!");
          navigate("/dashboard"); // Redirect after setup
        } else {
          setError("Failed to set password.");
        }
      } catch (error) {
        setError("Error connecting to the server.");
      }
    } else {
      // Password verification for returning user
      try {
        const response = await fetch("/api/verify-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (response.ok) {
          navigate("/dashboard"); // Redirect after successful login
        } else {
          setError("Incorrect password.");
        }
      } catch (error) {
        setError("Error connecting to the server.");
      }
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen">
      <Typography variant="h4" className="mb-6 font-bold">
        {isFirstTime ? "Set Your Password" : "Enter Your Password"}
      </Typography>

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        className="mb-4 w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {isFirstTime && (
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          className="mb-4 w-80"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      {error && (
        <Typography color="error" className="mb-2">
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        className="w-80"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

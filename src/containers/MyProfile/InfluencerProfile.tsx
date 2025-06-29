import React, { useState, useEffect } from "react";
import { NavLink, redirect } from "react-router-dom";
import { Box, Toolbar, Button } from "@mui/material";
import { CampaignHeader } from "../CreateCampaign/CampaignHeader";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoneIcon from "@mui/icons-material/Done";
import DialogActions from "@mui/material/DialogActions";
import {
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { getInstagramProfile } from "../../store/apiPaths";
import { getProfile } from "../../store/apiPaths";
import { displayProfile } from "../../store/apiPaths";
import { DisplayInfluencerProfile } from "./DisplayInfluencerProfile";

const countryOptions = [
  { label: "India", value: "india" },
  // { label: "Above 50K", value: "Above 50K" },
  // { label: "Above 100K", value: "Above 100K" },
  // { label: "Above 500K", value: "Above 500K" },
  // { label: "Above 1M", value: "Above 1M" },
];

const stateOptions = [{ label: "Tamilnadu", value: "tamilnadu" }];
const cityOptions = [
  { label: "Chennai", value: "chennai" },
  { label: "Coimbatore", value: "coimbatore" },
  { label: "Madurai", value: "madurai" },
  { label: "Trichy", value: "trichy" },
  { label: "Vellore", value: "vellore" },
];
const categoryOptions = [
  { label: "Fashion", value: "fashion" },
  { label: "Travel", value: "travel" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Movies", value: "movies" },
  { label: "Finance", value: "finance" },
];

export const InfluencerProfile = (props: any) => {
  const [formFields, setFormFields] = React.useState<any>({
    user_id: localStorage.getItem("user_id") || "",
  });

  const navigate = useNavigate();
  const [validate, setValidate] = React.useState<boolean>(false);
  const [otpSent, setOtpSent] = React.useState<boolean>(false); // Flag to track if OTP is sent
  const [sentOtp, setSentOtp] = React.useState<string>(""); // Store the OTP sent by the backend
  const [otpVerified, setOtpVerified] = React.useState<boolean>(false); // Flag to track OTP verification status
  const [otpError, setOtpError] = React.useState<boolean>(false); // Flag to track OTP error for styling
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const [profileExist, setprofileExist] = useState(false);

  useEffect(() => {
    // Fetch the influencer profile on component mount
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          displayProfile + "/" + formFields.user_id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data", data);
          if (data) {
            setprofileExist(true);
            setFormFields((prevFields: any) => ({
              ...prevFields,
              first_name: data.first_name || "",
              last_name: data.last_name || "",
              email: data.email || "",
              phone_number: data.phone_number || "",
              followers: data.followers || "",
              insta_id: data.insta_id || "",
              category: data.category || "",
              city: data.city || "",
              country: data.country || "",
              state: data.state || "",
              profile: data.profile || "",
              bio: data.bio || "",
              accepted: data.accepted || "",
              ongoing: data.ongoing || "",
              past: data.past || "",
            }));
            setEdit(false);
          }
        } else {
          console.error("Error fetching profile:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch profile details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [formFields.user_id]); // This effect will run once the component mounts or user_id changes

  const [instagramInfo, setInstagramInfo] = React.useState<any>({});
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e);
    console.log("e", e.target?.name, e.target?.value);

    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdownChange = (e: any) => {
    if (e.target.value) {
      setFormFields({
        ...formFields,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleInstaIDValidate = async () => {
    setValidate(true);
    console.log("validate button clicked");
    if (formFields.insta_id) {
      const response = await fetch(
        getInstagramProfile + "?username=" + formFields.insta_id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setInstagramInfo(data); //update the instagram api
        // Directly update formFields with the fetched data
        setFormFields((prevFields: any) => ({
          ...prevFields,
          email: data.email || "",
          phone_number: data.phone_number || "",
          followers: data.followers || "",
          profile: data.profile_pic_base64 || "",
          bio: data.bio || "",
        }));
      }
      //make api call to
    } else {
      console.log("show error that instagram id is not entered");
    }
  };

  const handleSaveClick = async () => {
    console.log("Submit button clciked");
    const enteredOtp = formFields.emailVerificationOTP?.trim();
    const sentOtp = instagramInfo.otp;
    console.log("Sentotp", sentOtp);
    console.log("Entered otp:", enteredOtp);

    if (validate) {
      if (String(enteredOtp) === String(sentOtp).trim()) {
        setOtpVerified(true);
        setOtpError(false);
        alert("OTP Verified");
      } else {
        setOtpVerified(false);
        setOtpError(true);
        console.error("OTP is incorrect");
        alert("OTP not entered");
        return; // Stop the profile save if OTP is incorrect
      }
      const payload = {
        ...formFields, // Form fields (user inputs)
      };

      console.log("FormFields:", formFields);
      console.log("Payload to backend:", payload);

      try {
        const response = await fetch(getProfile, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send the combined payload
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Profile created successfully", data);
          navigate("/user/influencer");
        } else {
          console.error("Error adding profile:", data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert("Please validate instagram account");
    }
  };

  if (loading) {
    return (
      <div className="mt-[100px] ml-[250px] text-xl font-bold">
        Loading Profile...
      </div>
    );
  }
  if (profileExist && !edit) {
    return <DisplayInfluencerProfile user={formFields} setEdit={setEdit} />;
  } else {
    return (
      <>
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "250px" }}>
          <Toolbar />
          <CampaignHeader title="My Profile" />
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
              overflow: "scroll",
              width: "70%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div id="parent">
              <div
                style={{
                  display: "inline-block",
                  width: "20%",
                  marginLeft: "2vw",
                }}
              >
                {" "}
                <TextField
                  disabled={!edit}
                  fullWidth
                  variant="outlined"
                  name="first_name"
                  label="First Name"
                  value={formFields.first_name}
                  required
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={handleFormChange}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "20%",
                  marginLeft: "2vw",
                }}
              >
                <TextField
                  fullWidth
                  disabled={!edit}
                  variant="outlined"
                  name="last_name"
                  label="Last Name"
                  value={formFields.last_name}
                  required
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={handleFormChange}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "20%",
                  marginLeft: "2vw",
                }}
              >
                <TextField
                  fullWidth
                  disabled={!edit}
                  variant="outlined"
                  name="insta_id"
                  label="Instagram ID"
                  value={formFields.insta_id}
                  required
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={handleFormChange}
                />
              </div>
              {edit && (
                <div
                  style={{
                    display: "inline-block",
                    width: "20%",
                    marginLeft: "2vw",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    type="button"
                    color="primary"
                    name="validate"
                    onClick={handleInstaIDValidate}
                    // endIcon={<ArrowForwardIosIcon />}
                  >
                    Verify Instagram ID
                  </Button>
                </div>
              )}
            </div>

            <div id="parent">
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                }}
              >
                <TextField
                  fullWidth
                  disabled={!edit}
                  variant="outlined"
                  name="email"
                  label="Email Address"
                  required
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  value={formFields.email || instagramInfo.email || ""}
                  //disabled={true}
                  onChange={handleFormChange}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                }}
              >
                <TextField
                  disabled={!edit}
                  fullWidth
                  variant="outlined"
                  name="phone_number"
                  label="Phone Number"
                  required
                  value={
                    formFields.phone_number || instagramInfo.phone_number || ""
                  }
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={handleFormChange}
                />
              </div>
              {edit && (
                <div
                  style={{
                    display: "inline-block",
                    width: "30%",
                    marginLeft: "2vw",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="emailVerificationOTP"
                    label="Enter OTP"
                    required
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        color: "black !important", // Set text color to black
                        WebkitTextFillColor: "black !important", // For better browser compatibility
                        opacity: 1, // Ensure the text is fully visible
                      },
                      "& .MuiOutlinedInput-root.Mui-disabled": {
                        "& fieldset": {
                          borderColor: "black", // Optional: Customize border for disabled state
                        },
                      },
                      mb: 2,
                    }}
                    //  value={formFields.emailVerificationOTP}
                    onChange={handleFormChange}
                    error={otpError}
                    helperText={otpError ? "Invalid OTP" : ""}
                  />
                  {otpVerified && (
                    <p style={{ color: "green" }}>OTP Verified Successfully!</p>
                  )}
                </div>
              )}
            </div>

            <div id="parent">
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                  marginBottom: "20px",
                }}
              >
                <Autocomplete
                  disabled={!edit}
                  disablePortal
                  options={countryOptions}
                  id={"country"}
                  value={
                    countryOptions.find(
                      (option) => option.value === formFields.country
                    ) || null
                  }
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": {
                      color: "primary.main",
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={(event, newValue) =>
                    handleDropdownChange({
                      target: {
                        name: "country",
                        value: newValue ? newValue.value : "",
                      },
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      name="country"
                      InputLabelProps={{
                        sx: {
                          color: "primary.dark", // Label color
                          "&.Mui-focused": {
                            color: "secondary.dark", // Focused label color
                          },
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          color: "primary.dark", // Text color
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                              // borderColor: "primary.dark", // Default border color
                            },
                            "&:hover fieldset": {
                              borderColor: "primary.light", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              // borderColor: "secondary.dark", // Border color on focus
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                }}
              >
                <Autocomplete
                  disabled={!edit}
                  disablePortal
                  options={stateOptions}
                  id={"state"}
                  value={
                    stateOptions.find(
                      (option) => option.value === formFields.state
                    ) || null
                  }
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": {
                      color: "primary.main", // Customize dropdown icon color
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={(event, newValue) =>
                    handleDropdownChange({
                      target: {
                        name: "state",
                        value: newValue ? newValue.value : "",
                      },
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="State"
                      name="state"
                      value={formFields.state}
                      InputLabelProps={{
                        sx: {
                          color: "primary.dark", // Label color
                          "&.Mui-focused": {
                            color: "secondary.dark", // Focused label color
                          },
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          color: "primary.dark", // Text color
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                              // borderColor: "primary.dark", // Default border color
                            },
                            "&:hover fieldset": {
                              borderColor: "primary.light", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "secondary.dark", // Border color on focus
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                }}
              >
                <Autocomplete
                  disablePortal
                  disabled={!edit}
                  options={cityOptions}
                  id={"city"}
                  value={
                    cityOptions.find(
                      (option) => option.value === formFields.city
                    ) || null
                  }
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": {
                      color: "primary.main", // Customize dropdown icon color
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={(event, newValue) =>
                    handleDropdownChange({
                      target: {
                        name: "city",
                        value: newValue ? newValue.value : "",
                      },
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      name="city"
                      value={formFields.city}
                      InputLabelProps={{
                        sx: {
                          color: "primary.dark", // Label color
                          "&.Mui-focused": {
                            color: "secondary.dark", // Focused label color
                          },
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          color: "primary.dark", // Text color
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                              // borderColor: "primary.dark", // Default border color
                            },
                            "&:hover fieldset": {
                              borderColor: "primary.light", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "secondary.dark", // Border color on focus
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
            </div>
            <div id="parent">
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                }}
              >
                <Autocomplete
                  disabled={!edit}
                  disablePortal
                  options={categoryOptions}
                  id={"category"}
                  value={
                    categoryOptions.find(
                      (option) => option.value === formFields.category
                    ) || null
                  }
                  sx={{
                    "& .MuiAutocomplete-popupIndicator": {
                      color: "primary.main", // Customize dropdown icon color
                    },
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={(event, newValue) =>
                    handleDropdownChange({
                      target: {
                        name: "category",
                        value: newValue ? newValue.value : "",
                      },
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      name="category"
                      value={formFields.category}
                      InputLabelProps={{
                        sx: {
                          color: "primary.dark", // Label color
                          "&.Mui-focused": {
                            color: "secondary.dark", // Focused label color
                          },
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          color: "primary.dark", // Text color
                          "&.MuiOutlinedInput-root": {
                            "& fieldset": {
                              // borderColor: "primary.dark", // Default border color
                            },
                            "&:hover fieldset": {
                              borderColor: "primary.light", // Border color on hover
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "secondary.dark", // Border color on focus
                            },
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
              <div
                style={{
                  display: "inline-block",
                  width: "30%",
                  marginLeft: "2vw",
                }}
              >
                <TextField
                  disabled={true}
                  fullWidth
                  variant="outlined"
                  name="followers"
                  label="No of Followers"
                  required
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black !important", // Set text color to black
                      WebkitTextFillColor: "black !important", // For better browser compatibility
                      opacity: 1, // Ensure the text is fully visible
                    },
                    "& .MuiOutlinedInput-root.Mui-disabled": {
                      "& fieldset": {
                        borderColor: "black", // Optional: Customize border for disabled state
                      },
                    },
                    mb: 2,
                  }}
                  onChange={handleFormChange}
                  value={formFields.followers || instagramInfo.followers || ""}
                />
              </div>
            </div>
            <DialogActions>
              <Button
                variant="contained"
                type="button"
                color="primary"
                name="save"
                onClick={handleSaveClick}
              >
                Save Profile
              </Button>
            </DialogActions>

            {/* <br /> */}
          </div>
        </Box>
      </>
    );
  }
};

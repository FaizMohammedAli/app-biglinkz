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
import { businessProfile } from "../../store/apiPaths";
import { getBusinessProfile } from "../../store/apiPaths";
import { DisplayBusinessProfile } from "./DisplayBusinessProfile";

const countryOptions = [{ label: "India", value: "india" }];

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

export const BusinessProfile = (props: any) => {
  const [formFields, setFormFields] = React.useState<any>({
    user_id: localStorage.getItem("user_id") || "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    // Fetch the influencer profile on component mount
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          getBusinessProfile + "/" + formFields.user_id,
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
            setFormFields((prevFields: any) => ({
              ...prevFields,
              name: data.name || "",
              email: data.email || "",
              website: data.website || "",
              insta_id: data.insta_id || "",
              category: data.category || "",
              city: data.city || "",
              country: data.country || "",
              state: data.state || "",
              total: data.total || "",
              active: data.active || "",
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

  const handleSaveClick = async () => {
    // Combine formFields and instagramInfo
    const payload = {
      ...formFields, // Form fields (user inputs)
    };

    console.log("FormFields:", formFields);
    console.log("Payload to backend:", payload);

    try {
      const response = await fetch(businessProfile, {
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
  };

  if (loading) {
    return (
      <div className="mt-[100px] ml-[250px] text-xl font-bold">
        Loading Profile...
      </div>
    );
  }

  if (formFields && !edit) {
    return <DisplayBusinessProfile business={formFields} setEdit={setEdit} />;
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
                  name="name"
                  label="Business Name"
                  value={formFields.name}
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
                    label="Business Email Address"
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
                    value={formFields.email || ""}
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
                    name="website"
                    label="Business website"
                    required
                    value={formFields.website || ""}
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
                    label="Business Instagram ID (Optional)"
                    value={formFields.insta_id}
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
                      disabled={!edit}
                      disablePortal
                      options={cityOptions}
                      id={"city"}
                      value={
                        cityOptions.find(
                          (option) => option.value === formFields.city
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
                                  // borderColor: "secondary.dark", // Border color on focus
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
              </div>
            </div>
          </div>
        </Box>
      </>
    );
  }
};

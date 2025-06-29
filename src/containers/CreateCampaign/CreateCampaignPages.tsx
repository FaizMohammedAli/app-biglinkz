import React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Input,
  TextField,
  Typography,
  Paper,
  useTheme,
  Grid,
  InputAdornment,
} from "@mui/material";
import { StyledTextArea } from "../../components/TextArea/StyledTextArea";
import {
  Select as BaseSelect,
  selectClasses,
  SelectListboxSlotProps,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const BrandTitle = (props: any) => {
  const [fileName, setFileName] = React.useState("");
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    setFileName(file.name);

    // If you're sending the file to the parent component (for example)
    props.onChange({
      target: {
        name: "brand_logo", // Or any other field name
        value: file, // Send the actual file object, not just the name
      },
    });
  };
  return (
    <div
      style={{
        //paddingTop: "20px",
        borderRadius: "10px",
        minWidth: "600px",
        minHeight: "100%",
      }}
      className="mx-auto"
    >
      <div className="margin-20">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          style={{ marginLeft: "40px" }}
        >
          Upload Brand Logo
          <input
            type="file"
            name="brand_logo"
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hide the default input but still allow interaction
          />
        </Button>
        &nbsp; <span>{fileName}</span>
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          label="Please Enter Your Brand Name"
          variant="outlined"
          fullWidth={true}
          name="brand_name"
          onChange={props.onChange}
          required
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          variant="outlined"
          required
          name="brand_instagram_id"
          onChange={props.onChange}
          label="Your Brand's Instagram Username"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          variant="outlined"
          required
          name="product"
          onChange={props.onChange}
          label="What Product or Service are you promoting (eg: shoes,cosmetics etc)"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          variant="outlined"
          name="website"
          onChange={props.onChange}
          label="Mention your Brand's Website"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          variant="outlined"
          required
          name="email"
          onChange={props.onChange}
          label="Your Brand's Business Email"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
    </div>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const contentType = [
  { label: "Instagram Reel", value: "Instagram Reel" },
  { label: "Instagram Carousel", value: "Instagram Carousel" },
  { label: "Instagram Feed", value: "Instagram Feed" },
  { label: "Instagram Story", value: "Instagram Story" },
];

const contentTime = [
  { label: "within a week", value: "1 week" },
  { label: "2 weeks", value: "2 weeks" },
  { label: "3 weeks", value: "3 weeks" },
  { label: "a month", value: "a month" },
];

const ContentInfo = (props: any) => {
  const [fileNames, setFileNames] = React.useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFileNames = filesArray.map((file) => file.name);
      setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
      props.onChange({
        target: {
          name: "campaign_assets",
          value: filesArray,
        },
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        minWidth: "600px",
        minHeight: "100%",
      }}
    >
      <div className="margin-20">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          style={{ marginLeft: "40px" }}
        >
          Upload Campaign Assets
          <input
            type="file"
            multiple
            name="campaign_assets"
            onChange={handleFileUpload}
            style={{ display: "none" }} // Hide the default input but still allow interaction
          />
        </Button>
        &nbsp; <span>{fileNames}</span>
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          required
          fullWidth={true}
          variant="outlined"
          name="caption"
          onChange={props.onChange}
          label="Caption to be added"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          required
          fullWidth={true}
          variant="outlined"
          name="hashtag"
          onChange={props.onChange}
          label="Hashtags to be added"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          required
          variant="outlined"
          name="tags"
          onChange={props.onChange}
          label="Instagram accounts to be tagged"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <Autocomplete
          disablePortal
          options={contentType}
          id={"contentType"}
          onChange={(event, newValue) =>
            props.onChange({
              target: {
                name: "content_type",
                value: newValue ? newValue.value : "",
              },
            })
          }
          sx={{
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.main", // Customize dropdown icon color
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type of Content to be created"
              required
              name="content_type"
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
                      borderColor: "primary.dark", // Default border color
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
  );
};

const followersOptions = [
  { label: "Above 10K", value: "10000" },
  { label: "Above 50K", value: "50000" },
  { label: "Above 100K", value: "100000" },
  { label: "Above 500K", value: "500000" },
  { label: "Above 1M", value: "1000000" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "No preference", value: "Any" },
];

const cityOptions = [
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Bhopal", value: "Bhopal" },
  { label: "Chennai", value: "chennai" },
  { label: "Cochin", value: "cochin" },
  { label: "Coimbatore", value: "coimbatore" },
  { label: "Delhi", value: "Delhi" },
  { label: "Gangtok", value: "Gangtok" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Pune", value: "pune" },
  { label: "Shillong", value: "Shillong" },
  { label: "Trivandrum", value: "trivandrum" },
  { label: "Vishakapatnam", value: "vizag" },
];
const InfluencerInfo = (props: any) => {
  return (
    <div
      style={{
        // border: "1px solid red",
        padding: "20px",
        // margin: "20px",
        borderRadius: "10px",
        minWidth: "600px",
        minHeight: "100%",
      }}
    >
      <div style={{ margin: "40px", width: "100%" }}>
        <Autocomplete
          disablePortal
          options={followersOptions}
          id={"targetFollowers"}
          sx={{
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.main", // Customize dropdown icon color
            },
          }}
          onChange={(event, newValue) =>
            props.onChange({
              target: {
                name: "target_followers",
                value: newValue ? newValue.value : "",
              },
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Target Influencers with Followers"
              name="target_followers"
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
                      borderColor: "primary.dark", // Default border color
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
      <div style={{ margin: "40px", width: "100%" }}>
        <Autocomplete
          disablePortal
          options={genderOptions}
          id={"targetGender"}
          sx={{
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.main", // Customize dropdown icon color
            },
          }}
          onChange={(event, newValue) =>
            props.onChange({
              target: {
                name: "influencer_gender",
                value: newValue ? newValue.value : "",
              },
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Influencer Gender"
              name="influencer_gender"
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
                      borderColor: "primary.dark", // Default border color
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
      <div style={{ margin: "40px", width: "100%" }}>
        <Autocomplete
          disablePortal
          options={cityOptions}
          sx={{
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.main", // Customize dropdown icon color
            },
          }}
          id={"targetLocation"}
          onChange={(event, newValue) =>
            props.onChange({
              target: {
                name: "influencer_location",
                value: newValue ? newValue.value : "",
              },
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Influencer Location (optional)"
              name="influencer_location"
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
                      borderColor: "primary.dark", // Default border color
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
  );
};

const reachOptions = [
  { label: "1K - 10K", value: "1000" },
  { label: "10K - 50K", value: "10000" },
  { label: "50K - 100K", value: "50000" },
  { label: "100K - 500K", value: "100000" },
  { label: "500K - 1M", value: "500000" },
  { label: "1M+", value: "1000000" },
];

const budgetOptions = [
  { label: "₹10,000 - ₹50,000", value: "₹10,000 - ₹50,000" },
  { label: "₹50,000 - ₹1,00,000", value: "₹50,000 - ₹1,00,000" },
  { label: "₹1,00,000 - ₹5,00,000", value: "₹1,00,000 - ₹5,00,000" },
  { label: "Other", value: "other" },
];

const campaignGoalOptions = [
  { label: "Brand Awareness", value: "Brand Awareness" },
  { label: "Lead Generation", value: "Lead Generation" },
  { label: "Product Sales", value: "Product Sales" },
  { label: "Website Traffic", value: "Website Traffic" },
  { label: "Customer Engagement", value: "Customer Engagement" },
];

const CampaignInfo = (props: any) => {
  const [selectedOption, setSelectedOption] = React.useState("");

  return (
    <div
      style={{
        // border: "1px solid red",
        padding: "20px",
        // margin: "20px",
        borderRadius: "10px",
        minWidth: "600px",
        minHeight: "100%",
      }}
    >
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          label="Please enter your Campaign Title"
          variant="outlined"
          fullWidth={true}
          name="campaign_title"
          onChange={props.onChange}
          required
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          label="Campaign Description"
          variant="outlined"
          fullWidth={true}
          name="description"
          onChange={props.onChange}
          required
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <Autocomplete
          disablePortal
          options={reachOptions}
          sx={{
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.main", // Customize dropdown icon color
            },
          }}
          id={"targetLocation"}
          onChange={(event, newValue) =>
            props.onChange({
              target: {
                name: "target_reach",
                value: newValue ? newValue.value : "",
              },
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Target Audience Reach"
              name="target_reach"
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
                      borderColor: "primary.dark", // Default border color
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
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          required
          variant="outlined"
          name="budget"
          onChange={props.onChange}
          label="Campaign Budget"
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>

      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          required
          variant="outlined"
          name="start_date"
          //value={props.formValues?.start_date || ""} // Safely access start_date
          onChange={props.onChange} // Pass the custom object
          label="Campaign Start Date"
          type="date"
          InputLabelProps={{
            shrink: true,
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>

      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          fullWidth={true}
          required
          variant="outlined"
          name="end_date"
          //value={props.formValues?.end_date || ""} // Safely access start_date
          onChange={props.onChange} // Pass the custom object
          label="Campaign End Date"
          type="date"
          InputLabelProps={{
            shrink: true,
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>

      <div style={{ margin: "40px", width: "100%" }}>
        <Autocomplete
          disablePortal
          options={campaignGoalOptions}
          sx={{
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.main", // Customize dropdown icon color
            },
          }}
          id={"targetLocation"}
          onChange={(event, newValue) =>
            props.onChange({
              target: {
                name: "goal",
                value: newValue ? newValue.value : "",
              },
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Primary Campaign Goal"
              name="goal"
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
                      borderColor: "primary.dark", // Default border color
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
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          label="Campaign Manager Name"
          variant="outlined"
          fullWidth={true}
          name="manager_name"
          onChange={props.onChange}
          required
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth={true}
          name="contact_number"
          onChange={props.onChange}
          required
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
      <div style={{ margin: "40px", width: "100%" }}>
        <TextField
          label="Collaborator Benefits(Optional) "
          variant="outlined"
          fullWidth={true}
          name="rewards"
          onChange={props.onChange}
          InputLabelProps={{
            sx: {
              color: "primary.dark", // Label color
              "&.Mui-focused": {
                color: "secondary.dark", // Focused label color
              },
            },
          }}
          InputProps={{
            sx: {
              color: "primary.dark", // Text color
              "&.MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.dark", // Default border color
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
      </div>
    </div>
  );
};

const Review = (props: any) => {
  return (
    <Box sx={{ padding: 2 }}>
      {props.values.length > 0 && (
        <Grid container spacing={4} columnSpacing={{ xs: 4, sm: 2, md: 4 }}>
          {props.values.map((key:any) => (
            <Grid item xs={12} sm={6} key={key}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    marginBottom: 0.5,
                  }}
                >
                  {key} :
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.primary",
                    marginLeft: 0.5,
                    fontStyle: "italic",
                  }}
                >
                  {props.values[key]}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export const CreateCampaignPages = (props: any) => {
  switch (props.activeStep) {
    case 0:
      return (
        <BrandTitle
          onChange={props.onChange}
          formValues={props.formValues}
          setFormValues={props.setFormValues}
        />
      );
    case 1:
      return (
        <ContentInfo
          onChange={props.onChange}
          formValues={props.formValues}
          setFormValues={props.setFormValues}
        />
      );
    case 2:
      return (
        <InfluencerInfo
          onChange={props.onChange}
          formValues={props.formValues}
          setFormValues={props.setFormValues}
        />
      );
    case 3:
      return (
        <CampaignInfo
          onChange={props.onChange}
          formValues={props.formValues}
          setFormValues={props.setFormValues}
        />
      );
    case 4:
      return <Review values={props.formValues} />;
    default:
      return <div></div>;
  }
};

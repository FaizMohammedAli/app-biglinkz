import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F289C", // New primary main color
      light: "#6B65C7", // A lighter shade of primary
      dark: "#1E1A67", // A darker shade of primary
      contrastText: "#FFFFFF", // High-contrast text color for readability
    },
    secondary: {
      main: "#A940D0", // New secondary main color
      light: "#D86AB3", // A lighter shade of secondary
      dark: "#8E3278", // A darker shade of secondary
      contrastText: "#FFFFFF", // High-contrast text color for readability
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#ED6C02",
    },
    info: {
      main: "#0288D1", //soft blue
      light: "#5EB8FF", //sky blue
      dark: "#005B9F", //navy
    },
    success: {
      main: "#388E3C",
    },
    background: {
      default: "#FAFAFA", //usual bg
      paper: "#FFFFFF", //cards
    },
    text: {
      primary: "#1C1C1E", // black
      secondary:
        "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ", // grey
    },
  },
});

export default theme;

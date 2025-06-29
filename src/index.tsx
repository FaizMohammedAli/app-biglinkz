import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./Theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { StyledEngineProvider } from "@mui/material/styles";
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <App />
      </StyledEngineProvider>
    </React.StrictMode>
  </ThemeProvider>
);

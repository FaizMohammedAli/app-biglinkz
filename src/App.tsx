import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Sidemenu } from "./components/Sidemenu/Sidemenu";
import "./styles.css";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Router } from "./Routes/router";

export default function App() {
  const [selectedMenu, setSelectedMenu] = React.useState("");
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {/* <Header />
      <Sidemenu setSelectedMenu={setSelectedMenu} /> */}
      <Router />
    </Box>
  );
}

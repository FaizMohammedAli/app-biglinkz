import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
//import HomeHeader from "./HomeHeader";
import { HomeHero } from "./Homehero";
import Working from "./HomeSection1";
import HomeStrategy from "./HomeStrategy";
import HomeBenchmark from "./HomeBenchmark";
import HomeWorkspace from "./HomeWorkspace";
import HomeStatics from "./HomeStatistics";

export const HomeContainer = (props: any) => {
  return (
    <div>
      <HomeHero />
      <Working />
      <HomeBenchmark />
      <HomeStatics />
      <HomeStrategy />
      <HomeWorkspace />
    </div>
  );
};

import React from "react";
import { Box } from "@mui/material";
import SideNav from "../components/SideBar/SideNav";
import MainContent from "../components/Content/MainContent";
import PopularBooks from "../components/Content/PopularBooks";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 2
      }}>
      <SideNav />
      <MainContent />
      <PopularBooks />
    </Box>
  );
};

export default HomePage;

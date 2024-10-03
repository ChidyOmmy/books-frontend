import React from "react";
import BookList from "../Book/BookList";
import HeroCard from "../Hero/HeroCard";
import { Stack } from "@mui/material";
import BookPagination from "../Book/BookPagination";

const MainContent = () => {
  return (
    <Stack direction='row' spacing={2}>
      <Stack direction='column' spacing={2}>
        <HeroCard />
        <BookList />
        <BookPagination />
      </Stack>
    </Stack>
  );
};

export default MainContent;

import { Box, Pagination } from "@mui/material";
import React, { useContext, useState } from "react";
import { BookContext } from "../../context/bookContext";

const BookPagination = () => {
  const { getBooks, booksCount } = useContext(BookContext);
  let count = booksCount / 3;
  if (!Number.isInteger(count)) count = Math.ceil(count);
  const handleChange = (e, page) => {
    getBooks(page, 3);
  };
  return (
    <Box
      sx={{ flexAlign: "center", display: booksCount < 3 ? "none" : "block" }}>
      <Pagination
        count={count}
        defaultPage={1}
        color='primary'
        shape='rounded'
        onChange={handleChange}
      />
    </Box>
  );
};

export default BookPagination;

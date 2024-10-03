import React, { useState, useEffect, useContext } from "react";
import BookCard from "./BookCard";
import { Box, Skeleton, Stack } from "@mui/material";
import { BookContext } from "../../context/bookContext";

const BookList = () => {
  const { books, setBooks } = useContext(BookContext);
  const skeletons = [1, 2, 3];

  return (
    <Stack
      direction='row'
      flexWrap='wrap'
      gap={2}
      sx={{ width: 700, maxWidth: "100%" }}>
      {books.length < 1 ? (
        <>
          {skeletons.map((skeleton) => (
            <Skeleton
              key={skeleton}
              variant='rectangular'
              width={200}
              height={200}
            />
          ))}
        </>
      ) : (
        <>
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default BookList;

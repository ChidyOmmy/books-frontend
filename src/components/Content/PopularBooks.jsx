import React, { useState, useEffect, useContext } from "react";
import BookCard from "../Book/BookCard";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BookContext } from "../../context/bookContext";

const PopularBooks = () => {
  const theme = useTheme();
  const { books } = useContext(BookContext);
  const popularBooks = books.slice(0, 2);
  const skeletons = [1, 2, 3];

  return (
    <Stack
      bgcolor={theme.palette.greenishColor.main}
      sx={{ borderRadius: theme.shape.borderRadius }}
      direction='column'
      p={2}
      spacing={2}>
      <Typography variant='h6'>Popular Books</Typography>
      {books.length < 1 ? (
        <>
          {skeletons.map((skeleton) => (
            <Skeleton
              key={skeleton}
              variant='reactangular'
              width={200}
              height={200}
            />
          ))}
        </>
      ) : (
        <>
          {popularBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default PopularBooks;
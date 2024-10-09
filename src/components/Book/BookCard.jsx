import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import BookMarkBorder from "@mui/icons-material/BookMarkBorder";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import React, { useContext } from "react";
import { BookContext } from "../../context/bookContext";
import LikeBook from "./likeBook";

const BookCard = ({ book }) => {
  return (
    <Card sx={{ width: 220 }}>
      <CardMedia
        height={200}
        width='100%'
        component='img'
        src={`http://localhost:8000/${book.cover}`}
      />
      <CardContent>
        <Typography variant='h6'>{book.title}</Typography>
        <Typography>
          {book.likeCount} likes {book.commentsCount} comments
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
        <LikeBook book={book} />
        <BubbleChartOutlinedIcon />
        <BookMarkBorder />
      </CardActions>
    </Card>
  );
};

export default BookCard;

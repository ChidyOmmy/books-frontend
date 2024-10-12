import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import BubbleChartOutlinedIcon from "@mui/icons-material/BubbleChartOutlined";
import React, { useContext } from "react";
import { BookContext } from "../../context/bookContext";
import LikeBook from "./likeBook";
import FavoriteBook from "./FavoriteBook";
import { useNavigate } from "react-router";

const BookCard = ({ book }) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ width: 220 }}>
      <CardMedia
        sx={{ cursor: 'pointer' }}
        height={200}
        width='100%'
        component='img'
        onClick={() => navigate(`book/${book._id}`)}
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
        <FavoriteBook book={book} />
      </CardActions>
    </Card>
  );
};

export default BookCard;

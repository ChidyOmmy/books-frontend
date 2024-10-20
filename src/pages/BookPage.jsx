import React, { useEffect, useState, useContext } from "react";
import { Box, Card, CardContent, CardMedia, Stack, Button, Typography } from "@mui/material";
import BookSkeleton from "./skeletons/BookSkeleton";
import { useParams } from "react-router";
import BookDetailCard from "../components/Book/BookDetailCard";
import BookComments from "../components/Book/BookComments";
import { RLink } from "../components/styled/StyledButtons";
import { UserContext } from '../context/userContext'
import ViewPage from "../components/PageView/ViewPage";

const BookPage = () => {
    const { user } = useContext(UserContext)
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([])
    const [pageCount, setPageCount] = useState([])
    const [book, setBook] = useState({
        _id: "66f73ca324d7943bc06acfef",
        title: "Star",
        cover: "1727478946842.9902.png",
        authors: [
            {
                _id: "66f7391424d7943bc06acfe0",
                username: "chidy"
            }
        ],
        likes: [
            "6703227469c355131948cabe",
            "6701e01bef38dfaa42bb7a8e",
            "66f7391424d7943bc06acfe0"
        ],
        comments: [
            {
                _id: "66f73cfb24d7943bc06acff7",
                text: "first comment"
            },
            {
                _id: "66f73fe524d7943bc06acffd",
                text: "first comment"
            },
            {
                _id: "66f747c9606ab84e93ecacdf",
                text: "second comment"
            },
            {
                _id: "66fb204566c762e1f35713e1",
                text: "new comment",
                text: "new comment"
            }
        ],
        __v: 12
    });

    const isAuthor = book.authors.some(author => author._id === user.id)

    const fetchBook = async () => {
        const response = await fetch(
            `http://localhost:8000/books/${id}`
        );
        const result = await response.json();

        if (result) {
            console.log("result", result.book);
            setBook(result.book)
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            fetchBook();
        } catch (error) {
            console.log("an error occured", error.message);
        }
        return () => { };
    }, []);

    return (
        <Stack justifyContent='center' alignitems='center' direction='row'>
            {loading ? (
                <BookSkeleton />
            ) : (
                <Stack direction='column' spacing={2}>
                        {isAuthor && <RLink to='edit' > Edit Book</RLink>}
                    <Stack direction='row' spacing={.5} sx={{ justifyContent: 'center' }}>
                        <Stack sx={{ height: '100%', width: '75%' }} direction='column' spacing={.5}>
                            <BookDetailCard book={book} />
                        </Stack>
                        <Stack sx={{ width: '40%', height: '100%' }} direction='column' spacing={.5}>
                            <Card sx={{ height: '100%' }} >
                                <CardMedia sx={{ width: '100%', height: '100%' }} component='img' src={`http://localhost:8000/${book.cover}`} />
                            </Card>
                        </Stack>
                    </Stack>
                        <BookComments book={book} />
                        <ViewPage book={book} />
                    </Stack>
            )}
        </Stack>
    );
};

export default BookPage;

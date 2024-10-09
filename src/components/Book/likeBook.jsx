import React, { useContext } from 'react';
import { IconButton, Typography } from '@mui/material'
import { BookContext } from "../../context/bookContext";
import { useGlobalStore } from "../../store/globalStore";

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const LikeBook = ({ book }) => {
    const openSnackbar = useGlobalStore((state) => state.openSnackbar)
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage)
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity)
    const { setBooks, setPopularBooks } = useContext(BookContext)
    const { user } = useContext(UserContext)
    const updateBooks = (books, id) => books.map((book) => book._id === id ? { ...book, userLiked: !book.userLiked, likeCount: book.userLiked ? book.likeCount - 1 : book.likeCount + 1 } : book)

    const handleLiked = async (id) => {
        console.log(user)
        if (!user.username) {
            setSnackbarMessage(<Typography>Please log in to like a book <Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></Typography>)
            setSnackbarSeverity('warning')
            setOpenSnackbar()
            return
        }
        setBooks((books) => updateBooks(books, id))
        setPopularBooks((books) => updateBooks(books, id))

        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/like`, {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify({ userId: user.id })
            })
            if (!response.ok) console.log('response not okay', response)
            const result = await response.json()
            if (result) {
                console.log(result)
            }
        } catch (error) {
            console.log('Fetch error', error.message)
        }
    }
    return (
        <IconButton onClick={() => handleLiked(book._id)}>
            {book.userLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
    );
}

export default LikeBook;

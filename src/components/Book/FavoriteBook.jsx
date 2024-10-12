import React, { useContext } from 'react';
import { IconButton, Typography } from '@mui/material'
import { BookContext } from "../../context/bookContext";
import { useGlobalStore } from "../../store/globalStore";

import BookMarkBorder from "@mui/icons-material/BookMarkBorder";
import BookMark from "@mui/icons-material/BookMark";

import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

const FavoriteBook = ({ book }) => {
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage)
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity)
    const { setBooks, setPopularBooks } = useContext(BookContext)
    const { user } = useContext(UserContext)

    const updateBooks = (books) => books.map((currentBook) => book._id === currentBook._id ? { ...currentBook, inFavorite: !currentBook.inFavorite } : currentBook)

    const handleFav = async () => {
        if (!user.username) {
            setSnackbarMessage(<Typography>Please log in to save a book to favorites <Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></Typography>)
            setSnackbarSeverity('info')
            setOpenSnackbar()
            return
        }
        setBooks((books) => updateBooks(books))
        setPopularBooks((books) => updateBooks(books))

        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/favorite`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${user.access}`
                },
                body: JSON.stringify({ userId: user.id })
            })
            const result = await response.json()
            if (!response.ok) {
                if (result.error) {

                    setSnackbarMessage(result.error)
                    setSnackbarSeverity('error')
                    setOpenSnackbar()
                } else {
                    setSnackbarMessage("An error occured, please try again")
                    setSnackbarSeverity('error')
                    setOpenSnackbar()
                }
                setBooks((books) => updateBooks(books))
                setPopularBooks((books) => updateBooks(books))
            }
            if (result) {
                console.log(result)
            }
        } catch (error) {
            setSnackbarMessage("Network error, please try again")
            setSnackbarSeverity('error')
            setOpenSnackbar()
            setBooks((books) => updateBooks(books))
            setPopularBooks((books) => updateBooks(books))
        }
    }
    return (
        <IconButton onClick={handleFav}>
            {book.inFavorite ? <BookMark /> : <BookMarkBorder />}
        </IconButton>
    );
}

export default FavoriteBook;
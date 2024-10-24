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

    const updateBooks = (books) => books.map((currentBook) => currentBook._id ===book._id ? { ...currentBook, userLiked: !currentBook.userLiked, likeCount: currentBook.userLiked ? currentBook.likeCount - 1 : currentBook.likeCount + 1 } : currentBook)
    const handleLiked = async () => {
        if (!user.access) {
            setSnackbarMessage(<Typography>Please log in to like a book <Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></Typography>)
            setSnackbarSeverity('info')
            setOpenSnackbar()
            return
        }
        setBooks((books) => updateBooks(books))
        setPopularBooks((books) => updateBooks(books))

        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/like`, {
                method: 'POST',
                   headers: { 
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${user.access}`
                 },
                body: JSON.stringify({ userId: user.id })
            })
            const result = await response.json()
            if (!response.ok){
                if(result.error){
                    setSnackbarMessage(result.error)
                    setSnackbarSeverity('error')
                    setOpenSnackbar()
                    
                }else{
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
            console.log('Fetch error', error.message)
            setSnackbarMessage('Network error, please try again')
            setSnackbarSeverity('error')
            setOpenSnackbar()
        }
    }
    return (
        <IconButton onClick={handleLiked}>
            {book.userLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
    );
}

export default LikeBook;

import { Avatar, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import AddAuthors from '../components/EditBook/AddAuthors';
import { useGlobalStore } from '../store/globalStore';
import EditPages from '../components/EditBook/EditPages';


const EditBook = () => {
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage)
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loading, setLoading] = useState(true)
    const [book, setBook] = useState({})
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [imagePreview, setImagePreview] = useState('')
    const [bookForm, setBookForm] = useState({
        title: '',
        subtitle: '',
        authors: [],
        cover: null,
    })
    const { id } = useParams()

    const handleFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setBookForm((prev) => ({ ...prev, cover: file }));
        }
    }
    const handleBookFormChange = (event, fieldname) => {
        setBookForm((prev) => ({
            ...prev,
            [fieldname]: event.target.value
        }))
    }
    const fetchBook = async () => {
        const response = await fetch(
            `http://localhost:8000/books/${id}`
        );
        const result = await response.json();

        if (result) {
            console.log("result", result.book);
            setBook(result.book)
            setLoading(false)
        }
    };

    const handleUpdateBook = async () => {
        setLoadingUpdate(true)
        const authors = selectedAuthors.map((author) => author._id)
        const body = new FormData()
        body.append('authors', JSON.stringify(authors))
        body.append('title', bookForm.title)
        body.append('subtitle', bookForm.subtitle)
        body.append('summary', bookForm.summary)
        body.append('bookId', book._id)
        body.append('cover', bookForm.cover)

        try {
            const response = await fetch('http://localhost:8000/books/update-book', {
                method: 'PUT',
                body: body
            })
            const result = await response.json()
            if (!response.ok) {
                result.error ? setSnackbarMessage(result.error) : setSnackbarMessage('an error occured, please try again')
                setSnackbarSeverity('error')
                setOpenSnackbar()
                return
            }
            result.book && setBook(result.book)
            setSelectedAuthors([])
            setSnackbarMessage(result.message)
            setSnackbarSeverity('success')
            setOpenSnackbar()
        } catch (error) {
            error.message ? setSnackbarMessage(error.message) : setSnackbarMessage('Network error, please try again')
            setSnackbarSeverity('error')
            setOpenSnackbar()
            return
        }
        setLoadingUpdate(false)
    }

    useEffect(() => {
        try {
            fetchBook();
        } catch (error) {
            console.log("an error occured", error.message);
        }
        return () => { };
    }, []);

    useEffect(() => {
        setBookForm((prev) => ({
            ...prev,
            title: book.title || '',
            subtitle: book.subtitle || '',
            summary: book.summary || ''
        }))
        return () => { };
    }, [book.title]);

    return (
        <Box>
            {loading ? 'Loading...' : (<>
                <Stack direction='column' spacing={2} >
                    <Stack direction='row' spacing={2}>
                        <Stack spacing={2} sx={{ width: '50%' }}>
                            <TextField onChange={(event) => handleBookFormChange(event, 'title')} value={bookForm.title} label='Book title' />
                            <TextField onChange={(event) => handleBookFormChange(event, 'subtitle')} value={bookForm.subtitle} label='subtitle' />
                            <TextField onChange={(event) => handleBookFormChange(event, 'summary')} value={bookForm.summary} multiline label='Summary' />
                            <AddAuthors selectedAuthors={selectedAuthors} setSelectedAuthors={setSelectedAuthors} book={book} />
                        </Stack>
                        <Stack spacing={1} sx={{ width: '50%' }}>
                            <Avatar variant='square' src={`http://localhost:8000/${book.cover}`} sx={{ width: '100%', height: 200 }} />

                            <Stack direction='row' spacing={1}>
                                <Stack sx={{ width: bookForm.cover ? '50%' : '100%' }}>
                                    <Button sx={{ borderRadius: 0 }} fullWidth variant='contained' component='label'> Change Cover Image <input onChange={handleFile} type="file" hidden /> </Button>
                                    <Typography>Book authors: {book.authors.map((author) => <span key={author._id}> {author.username}</span>)}  </Typography>
                                </Stack>
                                {bookForm.cover && (
                                    <Stack sx={{ width: '50%' }}>
                                        <Avatar variant='square' src={imagePreview} sx={{ width: '100%', height: 100 }} />
                                        <Typography variant='body2'>New cover image: {bookForm.cover.name} </Typography>
                                    </Stack>
                                )}

                            </Stack>
                        </Stack>
                    </Stack>
                    <Button disabled={loadingUpdate} onClick={handleUpdateBook} variant='contained'>Update Book {loadingUpdate && <CircularProgress size={16} />} </Button>
                    <EditPages />
                </Stack>
            </>)}

        </Box>
    );
}

export default EditBook;

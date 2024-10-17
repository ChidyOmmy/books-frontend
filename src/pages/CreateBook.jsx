import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Stack, Avatar } from '@mui/material';
import { UserContext } from '../context/userContext';
import {useGlobalStore} from '../store/globalStore'
import {useNavigate} from 'react-router-dom'

const CreateBook = () => {
        const navigate = useNavigate()
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState('');
      
    const openSnackbar = useGlobalStore((state) => state.openSnackbar)
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage)
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity)

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file){
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }
  };

  const createBook = async () => {
    if (!image) {
        setSnackbarMessage('Please upload a book cover image.')
        setSnackbarSeverity('info')
        return setOpenSnackbar()
    }
    if (!title.trim()) {
        setSnackbarMessage('Book title cannot be empty.')
        setSnackbarSeverity('info')
        return setOpenSnackbar()
    }

    const body = new FormData();
    body.append('cover', image);
    body.append('title', title);
    body.append('authorId', user.id);

    try {
      const response = await fetch('http://localhost:8000/books/create', {
        method: 'POST',
        headers: {Authorization: `Bearer ${user.access}`},
        body,
      });
      const result = await response.json();
      console.log(result)
      if(!response.ok){
           setSnackbarMessage(result.error)
        setSnackbarSeverity('error')
         setOpenSnackbar()
      }else {
         setSnackbarMessage(result.message)
        setSnackbarSeverity('success')
         setOpenSnackbar()
        !openSnackbar && navigate(`/book/${result.book._id}`)      
      }
    } catch (error) {
      console.error(error.message);
       setSnackbarMessage('Network error, please try again')
        setSnackbarSeverity('error')
         setOpenSnackbar()
        
    }
  };

  return (
    <Box 
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create Book
      </Typography>
      <Stack spacing={2}>
        <TextField 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          label='Book Title' 
          variant='outlined' 
          fullWidth 
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button variant="contained" component="label">
            Upload Cover Image
            <input onChange={handleFile} type="file" hidden />
          </Button>
          {imagePreview && (
            <Avatar 
              src={imagePreview} 
              alt="Selected Image" 
              variant="square"
              sx={{ width: 56, height: 56 }} 
            />
          )}
        </Stack>
        <Typography variant="body2" color="textSecondary">
          {image && `Selected: ${image.name}`}
        </Typography>
        <Typography variant="body1">Author: {user?.name || 'You'}</Typography>
        <Button 
          onClick={createBook} 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Create Book
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateBook;

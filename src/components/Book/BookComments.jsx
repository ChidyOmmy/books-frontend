import { Avatar, Skeleton, Box, Card, List, ListItem, Button, ListItemAvatar, ListItemText, Stack, Typography, Divider, TextField } from '@mui/material';
import React, { useState, useContext,useEffect } from 'react';
import {Link} from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import CommentsSkeleton from './CommentsSkeleton'
import { useGlobalStore } from "../../store/globalStore";

const BookComments = ({ book }) => {
    const openSnackbar = useGlobalStore((state) => state.openSnackbar)
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage)
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity)

    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [commentError, setCommentError] = useState(false)

    const handleChange = (event) => {
        setComment(event.target.value)
    }
    const sendComment = async () => {
       if(!user.access){
           setSnackbarMessage(<Typography>Please log in to comment on  a book <Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></Typography>)
            setSnackbarSeverity('info')
            setOpenSnackbar()
            return
       }
       if(!comment.trim()){
        setCommentError(true)
        setComment('')
        return
       }
        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/comment`, {
                method: 'POST',
                headers: { 
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${user.access}`
                 },
                body: JSON.stringify({
                    userId: user.id,
                    text: comment
                })
            })
            const result = await response.json()
            if (response.ok) {
                const comment = result.comment
                setComments((prevComments)=>[...prevComments, comment])
                setComment('')
                setSnackbarMessage(result.message)
                setSnackbarSeverity('success')
                setOpenSnackbar()
            } else {
                console.log(result)
                if(result.error){
                    setSnackbarMessage(result.error)
                    setSnackbarSeverity('error')
                    setOpenSnackbar()
                }else{
                      setSnackbarMessage("Failed to comment, please try again")
                setSnackbarSeverity('success')
                setOpenSnackbar()
                }
            }

        } catch (error) {
            console.error('Fetch error', error)
              setSnackbarMessage("Network error, please try again")
                setSnackbarSeverity('error')
                setOpenSnackbar()
        }
    }
    const getComments = async() => {
        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/comments`)
            const result = await response.json()
            if(response.ok){
                setComments(result.comments)
                setLoading(false)
                console.log(result)
            }else{
                console.log('Response not okay', result)
                if(result.error){
                      setSnackbarMessage(result.error)
                setSnackbarSeverity('error')
                setOpenSnackbar()
                }else{
                setSnackbarMessage("An error occured, please try again")
                setSnackbarSeverity('error')
                setOpenSnackbar()
                }
            }
        } catch (error) {
            console.log(error)
              setSnackbarMessage("Can't load comments, please reload")
                setSnackbarSeverity('error')
                setOpenSnackbar()
        }
    }
    useEffect(() => {
        getComments()
        return () => {};
    }, []);
    useEffect(()=>{
        setCommentError(false)
    },[comment])
    return (
        <Card sx={{}}>
            <Stack direction='column' spacing={2} m={2}>
                <Typography variant='h5' sx={{ fontWeight: 600 }}>
                    Comments
                </Typography>
                <List component='div' sx={{ height: 200, overflowY: 'auto' }}>
                    {loading ? ( [1,2].map((i)=> <CommentsSkeleton key={i} />)) : (
                        <>
                        {comments.length > 0 ? (<>
                            {comments.map((comment) => (
                                <React.Fragment key={comment._id}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={comment.user.username.toUpperCase()} src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={comment.user.username}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ color: 'text.primary', display: 'inline' }}
                                                    >
                                                        {comment.text}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </ React.Fragment>
                            ))}
                        </>) : (
                            <Typography>No comments yet</Typography>
                        )}
                    </>)}
                </List>
                <ListItem component='div' alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <TextField error={commentError} helperText={commentError ? "Can't post an empty comment": null} placeholder='Add a comment' value={comment} onChange={handleChange}  multiline variant='outlined' sx={{ borderRadius: 4 }} />
                    <Button onClick={sendComment}  variant='contained' color='primary' >Comment</Button>
                </ListItem>
            </Stack>
        </Card>
    );
}

export default BookComments;

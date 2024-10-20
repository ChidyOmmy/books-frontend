import { Avatar, AvatarGroup, Card, Stack, Typography, ListItemText } from '@mui/material';
import React from 'react';

const BookDetailCard = ({ book }) => {
    return (
        <Card sx={{ borderRadius: 0 }}>
            <Stack direction='column' spacing={2} m={2}>
                <ListItemText component='div' primary={<Typography variant='h5' sx={{ fontWeight: 600 }}>
                    {book.title}
                </Typography>} secondary={<Typography variant="body2">a haunted one</Typography>} />
                <Typography variant='h6' sx={{ fontWeight: 400 }}>About this book</Typography>
                <Typography>
                    {book.summary}
                </Typography>
                <Stack alignItems='center' direction='row' justifyContent='space-between'>
                    <Stack alignItems='center' direction='row' spacing={.5}>
                        <AvatarGroup>
                            {book.authors.map(author => <Avatar key={author._id} src='/static/images' sx={{ width: 30, height: 30 }} alt={author.username.toUpperCase()} />)}
                        </AvatarGroup>
                        <Typography>By {book.authors.map((author, index) => {
                            return index == book.authors.length - 1 ? `and ${author.username}` : `${author.username}, `
                        })}</Typography>
                    </Stack>
                    <Typography>12 pages</Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

export default BookDetailCard;

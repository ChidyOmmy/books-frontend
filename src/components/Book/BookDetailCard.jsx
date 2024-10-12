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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    printing and typesetting industry. Lorem Ipsum has been the industry's
                    printing and typesetting industry. Lorem Ipsum has been the industry's,
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                    printing and typesetting industry. Lorem Ipsum has been the industry's
                    printing and typesetting industry. Lorem Ipsum has been the industry's
                </Typography>
                <Stack alignItems='center' direction='row' justifyContent='space-between'>
                    <Stack alignItems='center' direction='row' spacing={.5}>
                        <AvatarGroup max={4}>
                            <Avatar sx={{ width: 35, height: 35 }} alt='author'>JK</Avatar>
                            <Avatar sx={{ width: 35, height: 35 }} alt='author'>RO</Avatar>
                            <Avatar sx={{ width: 35, height: 35 }} alt='author'>AB</Avatar>
                            <Avatar sx={{ width: 35, height: 35 }} alt='author'>NP</Avatar>
                            <Avatar sx={{ width: 35, height: 35 }} alt='author'>NP</Avatar>
                        </AvatarGroup>
                        <Typography>By Rashid Shakili,John Doe, Jane Doe and Jane Zei</Typography>
                    </Stack>
                    <Typography>12 pages</Typography>
                </Stack>
            </Stack>
        </Card>
    );
}

export default BookDetailCard;

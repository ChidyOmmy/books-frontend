import { Avatar, Stack } from '@mui/material';
import React,from 'react';
import 'katex/dist/katex.min.css'
import Editor from './Editor';

const EditPages = () => {

    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction='row' justifyContent='center'>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
            </Stack>
            <Editor />
        </Stack>
    );
}

export default EditPages;

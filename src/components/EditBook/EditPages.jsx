import { Avatar, Stack, Paper } from '@mui/material';
import React, { useState } from 'react';
import PaperTextArea from './PaperTextArea';
import MarkDown from 'react-markdown'
import remarkGFM from 'remark-gfm'
import { styled } from '@mui/material/styles'

const MarkDownContainer = styled(MarkDown)(({ theme }) => ({
    border: '1px solid green',
    backgroundColor: 'white',
    color: 'black', padding: '16px', width: '100%', maxWidth: '600px'
}))

const MarkdownPaper = styled(MarkDown)({
    // backgroundColor: "#fafafa",
    // color: '#000',
    padding: "16px",
    borderRadius: "8px",
    borderColor: "#e0e0e0",
    height: 24 * 23,
    maxHeight: 24 * 23,
    overflowY: 'auto'
});

const EditPages = () => {
    const [value, setValue] = useState(`# Hi`)

    const handleEditorChange = (event) => {
        console.log(event.target.value)
        setValue(event.target.value)
    }
    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction='row' justifyContent='center'>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
                <Avatar src='' alt='page 1' variant='square' sx={{ width: 100, height: 150 }}>Page 1</Avatar>
            </Stack>
            <Stack direction='row'>
                <PaperTextArea value={value} handleEditorChange={handleEditorChange} />
                <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
                    <MarkdownPaper remarkPlugins={[remarkGFM]} children={value} />
                </Paper>
            </Stack>
        </Stack>
    );
}

export default EditPages;

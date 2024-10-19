import React, { useState } from 'react';
import { Stack, Paper } from '@mui/material';
import PaperTextArea from './PaperTextArea';
import MarkDown from 'react-markdown'
import remarkGFM from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { styled } from '@mui/material/styles'
import 'katex/dist/katex.min.css'

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

const Editor = ({ handleEditorChange, value }) => {
    return (
        <Stack spacing={.5} direction='row'>
            <PaperTextArea value={value} handleEditorChange={handleEditorChange} />
            <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
                <MarkdownPaper remarkPlugins={[remarkGFM, remarkMath]} rehypePlugins={[rehypeKatex]} children={value} />
            </Paper>
        </Stack>
    );
}

export default Editor;

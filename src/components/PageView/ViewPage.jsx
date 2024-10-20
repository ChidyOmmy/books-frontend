import React, { useState, useEffect } from 'react';
import { Stack, Paper, Pagination } from '@mui/material';
import MarkDown from 'react-markdown'
import remarkGFM from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { styled } from '@mui/material/styles'
import 'katex/dist/katex.min.css'

const MarkdownPaper = styled(MarkDown)({
    padding: 2,
    borderRadius: 2,
    borderColor: "#e0e0e0",
    height: 645,
    maxHeight: 645,
    overflowY: 'auto'
});



const ViewPage = ({ book }) => {
    const [pages, setPages] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [value, setValue] = useState('')
    let count = Math.ceil(pageCount / 4);

    const handleChange = (e, page) => getPages(page);

    const getPages = async (skip = 0) => {
        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/pages?skip=${skip}`);
            const result = await response.json();
            console.log('pages', result)
            if (response.ok) {
                setPages(result.pages);
                setPageCount(result.pageCount);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPages()
        return () => { };
    }, []);

    return (
        <Stack spacing={2} direction='row' alignItems='center'>
            {/* have to make this sticky */}
            <Stack direction='column' alignItems='center' sx={{ position: 'sticky', top: 0 }} >
                <Stack direction='column' spacing={1} alignItems='center'>
                    {pages.map(page => <Paper onClick={() => setValue(page.content)} key={page._id} sx={{ width: 150, height: 200, cursor: 'pointer' }}>{page.content}</Paper>)}
                </Stack>
                {count > 1 &&
                    <Pagination
                        count={count}
                        defaultPage={1}
                        color='primary'
                        shape='rounded'
                        onChange={handleChange}
                    />
                }
            </Stack>
            <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
                <MarkdownPaper remarkPlugins={[remarkGFM, remarkMath]} rehypePlugins={[rehypeKatex]} children={value} />
            </Paper>

        </Stack>
    )

}

export default ViewPage;

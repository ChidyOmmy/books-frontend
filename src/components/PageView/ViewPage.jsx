import React, { useState, useEffect } from 'react';
import { Stack, Paper, Pagination, Link, Typography } from '@mui/material';
import MarkDown from 'react-markdown';
import remarkGFM from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { styled } from '@mui/material/styles';
import 'katex/dist/katex.min.css';

const MarkdownPaper = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.divider,
    minHeight: 645,
}));

const ViewPage = ({ book }) => {
    const [pages, setPages] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [value, setValue] = useState('');

    let count = Math.ceil(pageCount / 4);

    const handleChange = (e, page) => getPages(page);

    const getPages = async (skip = 0) => {
        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/pages?skip=${skip}`);
            const result = await response.json();
            console.log('pages', result);
            if (response.ok) {
                setPages(result.pages);
                setPageCount(result.pageCount);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPages();
    },);

    return (
        <Stack id='paperview' sx={{ paddingTop: 5 }} spacing={2} direction='column' alignItems='center' >
            <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '600px', }}>
                <MarkdownPaper>
                    <MarkDown components={{
                        img: ({ node, ...props }) => (
                            <img
                                {...props}
                                alt={props.alt}
                                style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
                            />
                        )
                    }} remarkPlugins={[remarkGFM, remarkMath]} rehypePlugins={[rehypeKatex]} children={value} />
                </MarkdownPaper>
            </Paper>
            <Stack direction='column' alignItems='center' spacing={1}>
                <Stack direction='row' spacing={1} alignItems='center'>
                    {pages.map((page) => (
                        <Link href='#paperview'>
                            <Paper
                                key={page._id}
                                onClick={() => setValue(page.content)}
                                sx={{ width: 150, height: 200, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <MarkDown
                                    components={{
                                        h1: 'h4', h2: 'h4', h3: 'h4'
                                    }}
                                >
                                    {page.content.split('\n').find(line => line.trim() !== '') || 'Untitled'}
                                </MarkDown>
                            </Paper>
                        </Link>
                    ))}
                </Stack>
                {count > 1 && (
                    <Pagination
                        count={count}
                        defaultPage={1}
                        color='primary'
                        shape='rounded'
                        onChange={handleChange}
                    />
                )}
            </Stack>
        </Stack>
    );
};

export default ViewPage;

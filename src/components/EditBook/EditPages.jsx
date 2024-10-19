// src/components/EditPages.js
import { Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PageSelector from './PageSelector';
import PageEditor from './PageEditor';
import { useGlobalStore } from '../../store/globalStore';

const EditPages = ({ book }) => {
    const [value, setValue] = useState(`## Edit your contents here and see the result on the markdown preview 👉`);
    const [updateMode, setUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState({});

    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar);
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage);
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity);

    const getPages = async (skip = 0) => {
        try {
            const response = await fetch(`http://localhost:8000/books/${book._id}/pages?skip=${skip}`);
            const result = await response.json();
            if (response.ok) {
                setPages(result.pages);
                setPageCount(result.pageCount);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageClick = (page) => {
        setUpdateMode(true);
        setCurrentPage(page);
        setValue(page.content);
    };

    const handleNew = () => {
        setUpdateMode(false);
        setValue(`## Edit your contents here and see the result on the markdown preview 👉`);
    };

    const handleChange = (e, page) => {
        getPages(page);
    };

    const updatePage = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/books/update-page`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pageId: currentPage._id,
                    content: value
                })
            })
            const result = await response.json()
            console.log(result)
            if (!response.ok) {
                result.error ? setSnackbarMessage(result.error) : setSnackbarMessage('An error occured please try again later')
                setSnackbarSeverity('error')
                setOpenSnackbar()
            } else {
                result.message ? setSnackbarMessage(result.message) : setSnackbarMessage('Successfully modified page')
                setSnackbarSeverity('success')
                setOpenSnackbar()
            }
        } catch (error) {
            errormessage ? setSnackbarMessage(error.message) : setSnackbarMessage('A network error occured, try again later')
            setSnackbarSeverity('error')
            setOpenSnackbar()
        }
        setLoading(false)
    }

    const addPage = async () => {
        setLoading(true)
        console.log(book._id)
        try {
            const response = await fetch('http://localhost:8000/books/create-page', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bookId: book._id,
                    content: value
                })
            })
            const result = await response.json()
            console.log(response)
            console.log(result)
            if (!response.ok) {
                result.error ? setSnackbarMessage(result.error) : setSnackbarMessage('An error occured please try again later')
                setSnackbarSeverity('error')
                setOpenSnackbar()
            } else {
                result.message ? setSnackbarMessage(result.message) : setSnackbarMessage('Successfully added a page to book')
                setSnackbarSeverity('success')
                setOpenSnackbar()
            }
        } catch (error) {
            errormessage ? setSnackbarMessage(error.message) : setSnackbarMessage('A network error occured, try again later')
            setSnackbarSeverity('error')
            setOpenSnackbar()
        }
        setLoading(false)
    }

    const handleDeletePage = async (pageId) => {
        try {
            const response = await fetch(`http://localhost:8000/books/delete-page`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pageId })
            });
            const result = await response.json();
            if (response.ok) {
                setPages(pages.filter((page) => page._id !== pageId));
                setSnackbarMessage('Page successfully deleted');
                setSnackbarSeverity('success');
                setUpdateMode(true);
                setValue('')
            } else {
                setSnackbarMessage(result.error || 'Failed to delete page');
                setSnackbarSeverity('error');
            }
            setOpenSnackbar();
        } catch (error) {
            setSnackbarMessage('A network error occurred, try again later');
            setSnackbarSeverity('error');
            setOpenSnackbar();
        }
    };

    useEffect(() => {
        getPages();
    }, []);

    return (
        <Stack spacing={2}>
            <Typography variant='h5'>ALL PAGES</Typography>
            <Typography variant='body1'>Select a page to edit its contents</Typography>
            <PageSelector
                pages={pages}
                handlePageClick={handlePageClick}
                handleNew={handleNew}
                pageCount={pageCount}
                handleChange={handleChange}
                handleDeletePage={handleDeletePage}
            />
            <PageEditor
                value={value}
                updateMode={updateMode}
                loading={loading}
                handleEditorChange={(e) => setValue(e.target.value)}
                updatePage={updatePage}
                addPage={addPage}
            />
        </Stack>
    );
};

export default EditPages;

// src/components/PageSelector.js
import { Avatar, Stack, Pagination, Badge, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Paper, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import MarkDown from 'react-markdown';

const PageSelector = ({ pages, handlePageClick, handleNew, pageCount, handleChange, handleDeletePage }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPage, setSelectedPage] = useState(null);
    let count = Math.ceil(pageCount / 4);

    const handleOpenDialog = (page) => {
        setSelectedPage(page);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPage(null);
    };

    const handleConfirmDelete = () => {
        handleDeletePage(selectedPage._id);
        handleCloseDialog();
    };

    return (
        <>
            <Stack spacing={2} direction='column' alignItems='center'>
                <Stack spacing={2} direction='row' justifyContent='center'>
                    {pages.map((page) => (
                        <Badge key={page._id} sx={{ position: 'relative' }}>
                            <Link sx={{ textDecoration: 'none' }} href='#paperview'>
                                <Paper
                                    key={page._id}
                                onClick={() => handlePageClick(page)}
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

                            {/* IconButton for Deleting Page */}
                            <IconButton
                                aria-label="delete"
                                sx={{ position: 'absolute', top: -5, right: -5 }}
                                onClick={() => handleOpenDialog(page)}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Badge>
                    ))}
                    <Link sx={{ textDecoration: 'none' }} href='#paperview'>
                        <Paper
                            onClick={handleNew}
                            sx={{ width: 150, height: 200, cursor: 'pointer', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '250%', fontWeight: 900 }}
                        > +</Paper>
                    </Link>
                </Stack>
                <Pagination
                    count={count}
                    defaultPage={1}
                    color='primary'
                    shape='rounded'
                    onChange={handleChange}
                />
            </Stack>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete Page</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this page? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PageSelector;

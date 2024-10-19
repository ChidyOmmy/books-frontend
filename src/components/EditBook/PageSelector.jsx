// src/components/PageSelector.js
import { Avatar, Stack, Pagination, Badge, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

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
                            <Avatar
                                onClick={() => handlePageClick(page)}
                                src=''
                                alt='page'
                                variant='square'
                                sx={{ width: 100, height: 150 }}
                            >
                                {page._id}
                            </Avatar>

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
                    <Avatar onClick={handleNew} src='' alt='new page' variant='square' sx={{ width: 100, height: 150 }}>+</Avatar>
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

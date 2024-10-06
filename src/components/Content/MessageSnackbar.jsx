import React from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material'
import { useGlobalStore } from '../../store/globalStore'

const MessageSnackbar = () => {
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const openSnackbar = useGlobalStore((state) => state.openSnackbar)
    const snackbarMessage = useGlobalStore((state) => state.snackbarMessage)
    const snackbarSeverity = useGlobalStore((state) => state.snackbarSeverity)

    return (
        <Box>
            <Snackbar open={openSnackbar} onClose={setOpenSnackbar} autoHideDuration={5000} >
                <Alert severity={snackbarSeverity} variant='filled' sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default MessageSnackbar;

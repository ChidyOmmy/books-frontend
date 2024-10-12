import React from 'react';
import { Skeleton, Box, Stack } from '@mui/material'

const BookSkeleton = () => {
    return (
        <Box>
            <Stack direction='row' spacing={2}>
                <Skeleton variant='rectangular' width={400} height={400} />
                <Skeleton variant='rectangular' width={400} height={400} />
            </Stack>
        </Box>
    );
}

export default BookSkeleton;

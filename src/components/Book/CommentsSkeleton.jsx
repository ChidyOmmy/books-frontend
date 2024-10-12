import React from 'react';
import {Skeleton} from '@mui/material'

const CommentsSkeleton = () => {
    return (
         <React.Fragment>
           <Skeleton variant='circular' width={30} height={30} />
           <Skeleton variant='text' sx={{ fontSize: '1rem', width: 400 }} />
           <Skeleton variant='text' sx={{ fontSize: '5rem', width: 450, lineHeight: '16px' }} />
         </ React.Fragment>
    );
}

export default CommentsSkeleton;

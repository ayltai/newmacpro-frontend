import { Backdrop, Box, CircularProgress, Typography, } from '@mui/material';
import React from 'react';

/**
 * Loading expresses an unspecified wait time of a process.
 * @param show If `true`, the component is shown.
 * @param message The message to display.
 */
export const Loading = ({
    show = false,
    message,
} : {
    show?    : boolean,
    message? : string,
}) => (
    <Backdrop open={show}>
        <Box textAlign='center'>
            <CircularProgress color='secondary' />
            <Typography color='secondary'>{message}</Typography>
        </Box>
    </Backdrop>
);

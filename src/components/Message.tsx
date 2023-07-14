import { Dialog, DialogContent, Typography, } from '@mui/material';
import React, { useEffect, } from 'react';

export const Message = ({
    open = false,
    message,
    onClose,
} : {
    open?    : boolean,
    message? : string,
    onClose? : () => void,
}) => {
    useEffect(() => {
        let timer : ReturnType<typeof setTimeout> | undefined;

        if (open && onClose) timer = setTimeout(onClose, 2500);

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [ open, ]);

    return (
        <Dialog open={open}>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
        </Dialog>
    );
};

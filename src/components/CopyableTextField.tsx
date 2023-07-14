import { ContentCopy, } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput, Snackbar, Tooltip, } from '@mui/material';
import React, { useState, } from 'react';

/**
 * CopyableTextFields let users copy text to their clipboard.
 * @param copyText The text to display on the Copy button.
 * @param copyHint The message to display when text is copied.
 * @param value The text to display and to be copied.
 * @param rest The other props to be passed down to the component.
 */
export const CopyableTextField = ({
    copyText,
    copyHint,
    value,
    ...rest
} : {
    copyText?        : string,
    copyHint?        : string,
    value?           : string,
    [ rest : string] : any,
}) => {
    const [ open, setOpen, ] = useState(false);

    const handleCopy = async () => {
        if (value) await navigator.clipboard.writeText(value);

        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            <OutlinedInput
                {...rest}
                value={value}
                endAdornment={
                    <InputAdornment position='end'>
                        <Tooltip title={copyText}>
                            <IconButton
                                edge='end'
                                onClick={handleCopy}>
                                <ContentCopy />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                } />
            <Snackbar
                open={open}
                anchorOrigin={{
                    horizontal : 'center',
                    vertical   : 'bottom',
                }}
                onClose={handleClose}
                autoHideDuration={2500}
                message={copyHint} />
        </>
    );
};

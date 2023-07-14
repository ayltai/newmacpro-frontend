import { DialogActions, } from '@mui/material';
import React, { FC, } from 'react';

import type { PageActionsProps, } from './PageActions.types';

const PageActions : FC<PageActionsProps> = ({
    children,
    ...rest
}) => (
    <DialogActions {...rest}>
        {children}
    </DialogActions>
);

export default PageActions;

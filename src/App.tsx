import { CssBaseline, ThemeProvider, } from '@mui/material';
import { ConfirmProvider, } from 'material-ui-confirm';
import React, { Fragment, } from 'react';

import { HomeScreen, } from './screens';
import { AppTheme, } from './styles';

export const App = () => (
    <Fragment>
        <CssBaseline />
        <ThemeProvider theme={AppTheme}>
            <ConfirmProvider>
                <HomeScreen />
            </ConfirmProvider>
        </ThemeProvider>
    </Fragment>
);

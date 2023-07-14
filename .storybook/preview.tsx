import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { CssBaseline, ThemeProvider, } from '@mui/material';
import { withThemeFromJSXProvider, } from '@storybook/addon-styling';
import type { Preview, } from '@storybook/react';
import React from 'react';

import { AppTheme, } from '../src/styles';
import i18n from './i18next';
import template from './template.mdx';

const preview : Preview = {
    parameters : {
        actions  : {
            argTypesRegex : '^on[A-Z].*',
        },
        controls : {
            matchers : {
                color : /(background|color)$/i,
                date  : /Date$/,
            },
        },
        docs     : {
            page : template,
        },
        i18n,
    },
    decorators : [
        withThemeFromJSXProvider({
            GlobalStyles : CssBaseline,
            Provider     : ThemeProvider,
            themes       : {
                light : AppTheme,
            },
            defaultTheme : 'light',
        }),
    ],
};

export default preview;

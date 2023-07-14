import { createTheme, } from '@mui/material/styles';
import { deepOrange, yellow, } from '@mui/material/colors';

export const AppTheme = createTheme({
    components : {
        MuiButton     : {
            styleOverrides : {
                root : {
                    paddingLeft   : 16,
                    paddingRight  : 16,
                    borderRadius  : '2rem',
                    textTransform : 'none',
                },
            },
        },
        MuiCard       : {
            styleOverrides : {
                root : {
                    borderRadius : '0.8rem',
                },
            },
        },
        MuiDialog     : {
            styleOverrides : {
                paper : {
                    borderRadius : '0.8rem',
                },
            },
        },
        MuiFab        : {
            styleOverrides : {
                root : {
                    textTransform : 'none',
                },
            },
        },
        MuiTypography : {
            styleOverrides : {
                button : {
                    textTransform : 'none',
                },
            },
        },
    },
    palette    : {
        primary   : {
            main : deepOrange[500],
        },
        secondary : {
            main : yellow[500],
        },
    },
    typography : {
        fontFamily : [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
});

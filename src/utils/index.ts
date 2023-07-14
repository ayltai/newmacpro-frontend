import * as Sentry from '@sentry/react';

export const handleError = (error : any) => {
    if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(error);
    } else {
        console.error(error);
    }
};

export const capitalizeFirstLetter = (input : string) => input.charAt(0).toUpperCase() + input.slice(1);

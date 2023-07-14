import { styled, Typography, } from '@mui/material';
import React, { FC, } from 'react';

import type { PageTitleProps, } from './PageTitle.types';

const SingleLineTypography = styled(Typography)({
    display         : '-webkit-box',
    overflow        : 'hidden',
    textOverflow    : 'ellipsis',
    WebkitBoxOrient : 'vertical',
    WebkitLineClamp : 1,
});

export const PageTitle : FC<PageTitleProps> = ({
    children,
    ...rest
}) => (
    <SingleLineTypography
        gutterBottom
        variant='h6'
        fontWeight='bold'
        {...rest}>
        {children}
    </SingleLineTypography>
);

export default PageTitle;

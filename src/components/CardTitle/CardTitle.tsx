import { styled, Typography, } from '@mui/material';
import React, { FC, } from 'react';

import type { CardTitleProps, } from './CardTitle.types';

const SingleLineTypography = styled(Typography)({
    display         : '-webkit-box',
    overflow        : 'hidden',
    textOverflow    : 'ellipsis',
    WebkitBoxOrient : 'vertical',
    WebkitLineClamp : 1,
});

const CardTitle : FC<CardTitleProps> = ({
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

export default CardTitle;

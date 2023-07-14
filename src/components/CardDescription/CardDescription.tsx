import { styled, } from '@mui/material';
import React, { FC, } from 'react';

import { default as Description, } from '../Description';
import type { CardDescriptionProps, } from './CardDescription.types';

const TruncatedDescription = styled(Description)({
    display         : '-webkit-box',
    overflow        : 'hidden',
    textOverflow    : 'ellipsis',
    WebkitBoxOrient : 'vertical',
    WebkitLineClamp : 2,
});

const CardDescription : FC<CardDescriptionProps> = ({
    children,
    ...rest
}) => (
    <TruncatedDescription {...rest}>
        {children}
    </TruncatedDescription>
);

export default CardDescription;

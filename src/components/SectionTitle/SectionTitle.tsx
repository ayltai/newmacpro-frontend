import { Typography, } from '@mui/material';
import React, { FC, } from 'react';

import type { SectionTitleProps, } from './SectionTitle.types';

const SectionTitle : FC<SectionTitleProps> = ({
    children,
    ...rest
}) => (
    <Typography
        gutterBottom
        variant='h4'
        fontWeight='bold'
        {...rest}>
        {children}
    </Typography>
);

export default SectionTitle;

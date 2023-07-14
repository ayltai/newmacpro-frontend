import { Typography, } from '@mui/material';
import React, { FC, } from 'react';

import type { DescriptionProps, } from './Description.types';

const Description : FC<DescriptionProps> = ({
    children,
    ...rest
}) => (
    <Typography {...rest}>
        {children}
    </Typography>
);

export default Description;

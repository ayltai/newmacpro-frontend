import { Link, } from '@mui/material';
import React, { FC, } from 'react';

import type { FooterLinkProps, } from './FooterLink.types';

const FooterLink : FC<FooterLinkProps> = ({
    children,
    onClick,
    ...rest
}) => (
    <Link
        sx={{
            cursor : 'pointer',
        }}
        underline='none'
        role='link'
        onClick={onClick}
        {...rest}>
        {children}
    </Link>
);

export default FooterLink;

import { Typography, } from '@mui/material';
import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import { default as FooterLink, } from '../FooterLink';
import { default as Footer, } from './Footer';

const meta : Meta<typeof Footer> = {
    component : Footer,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        background : {
            description : 'Background styles of the component.',
        },
        maxWidth   : {
            description : 'Maximum width of the component.',
        },
        children   : {
            description : 'Children of the component.',
        },
    },
};

export default meta;

const Label = ({
    children,
} : {
    children : string,
}) => (
    <Typography
        color='grey.400'
        variant='caption'>
        {children}
    </Typography>
);

type Story = StoryObj<typeof Footer>;

export const Default : Story = {
    args : {
        children : [
            <FooterLink key='terms'>
                <Label>Terms and conditions</Label>
            </FooterLink>,
            <FooterLink key='privacy'>
                <Label>Privacy policy</Label>
            </FooterLink>,
            <FooterLink key='disclaimer'>
                <Label>Disclaimer</Label>
            </FooterLink>,
        ],
    },
};

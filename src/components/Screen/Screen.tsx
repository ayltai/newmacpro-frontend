import { Box, } from '@mui/material';
import React, { FC, ReactElement, } from 'react';

import { default as Footer, FooterProps, } from '../Footer';
import { default as TopBar, TopBarProps, } from '../TopBar';
import { ScreenProps, } from './Screen.types';

const Screen : FC<ScreenProps> = ({
    children,
}) => {
    const contents : ReactElement[] = [];

    let footer : ReactElement<FooterProps> | undefined;
    let topBar : ReactElement<TopBarProps> | undefined;

    if (children) {
        if (Array.isArray(children)) {
            contents.push(...children.filter(child => child.type !== TopBar && child.type !== Footer));

            footer = children.find(child => child.type === Footer) as ReactElement<FooterProps>;
            topBar = children.find(child => child.type === TopBar) as ReactElement<TopBarProps>;
        } else {
            if (children.type !== Footer && children.type !== TopBar) contents.push(children);

            if (children.type === Footer) footer = children as ReactElement<FooterProps>;
            if (children.type === TopBar) topBar = children as ReactElement<TopBarProps>;
        }
    }

    return (
        <Box width='100%'>
            {topBar}
            {contents}
            {footer}
        </Box>
    );
};

export default Screen;

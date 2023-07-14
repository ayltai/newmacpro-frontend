import { AppBar, Box, Button, Container, Toolbar, useMediaQuery, useScrollTrigger, } from '@mui/material';
import React, { cloneElement, FC, Fragment, ReactElement, } from 'react';

import { default as Action, ActionProps, } from '../Action';
import { default as Branding, BrandingProps, } from '../Branding';
import { default as Shortcut, ShortcutProps, } from '../Shortcut';
import { default as ShortcutMenu, } from '../ShortcutMenu';
import type { TopBarProps, } from './TopBar.types';

const ElevationScroll = ({
    children,
} : {
    children : ReactElement,
}) => {
    const trigger = useScrollTrigger({
        disableHysteresis : true,
        threshold         : 0,
    });

    return cloneElement(children, {
        elevation : trigger ? 4 : 0,
    });
};

const TopBar : FC<TopBarProps> = ({
    maxWidth = 'lg',
    children,
}) => {
    const desktopMode = useMediaQuery('(min-width:900px)');

    let branding : ReactElement<BrandingProps> | undefined;

    const actions   : ReactElement<ActionProps>[]   = [];
    const shortcuts : ReactElement<ShortcutProps>[] = [];

    if (children) {
        if (Array.isArray(children)) {
            branding = children.find(child => child.type === Branding) as ReactElement<BrandingProps>;

            actions.push(...children.filter(child => child.type === Action) as ReactElement<ActionProps>[]);
            shortcuts.push(...children.filter(child => child.type === Shortcut) as ReactElement<ShortcutProps>[]);
        } else {
            if (children.type === Branding) branding = children as ReactElement<BrandingProps>;

            if (children.type === Action) actions.push(children as ReactElement<ActionProps>);
            if (children.type === Shortcut) shortcuts.push(children as ReactElement<ShortcutProps>);
        }
    }

    const handleClick = () => window.location.href = '/';

    return (
        <Fragment>
            <ElevationScroll>
                <AppBar color='inherit'>
                    <Container maxWidth={maxWidth}>
                        <Toolbar disableGutters>
                            <Box flexGrow={1}>
                                {!desktopMode && shortcuts.length > 0 && (
                                    <ShortcutMenu>
                                        {shortcuts}
                                    </ShortcutMenu>
                                )}
                                {branding && (
                                    <Button
                                        size='large'
                                        color='inherit'
                                        onClick={handleClick}>
                                        {branding}
                                    </Button>
                                )}
                            </Box>
                            <Box flexGrow={0}>
                                {desktopMode && shortcuts}
                                {actions}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </Fragment>
    );
};

export default TopBar;

import { Button, MenuItem, useMediaQuery, } from '@mui/material';
import React, { FC, } from 'react';

import type { ShortcutProps, } from './Shortcut.types';

/**
 * Shortcuts allow users to quickly navigate to anchored elements.
 * @param mode Specify the display mode to use. `desktop` is a text button. `mobile` is a menu item. If not provided, the mode is determined by the screen size.
 * @param anchor The `href` attribute of the anchored element to navigate to if `onClick` is not provided.
 * @param onClick The event handler called when the component is clicked.
 * @param children The content of the component.
 * @param rest The other props passed down to the component.
 */
const Shortcut : FC<ShortcutProps> = ({
    mode,
    anchor,
    children,
    onClick,
    ...rest
}) => {
    const isDesktop   = useMediaQuery('(min-width: 900px)');
    const desktopMode = mode === 'desktop' || mode !== 'mobile' && isDesktop;

    const handleClick = () => window.location.href = `#${anchor ?? ''}`;

    return desktopMode ? (
        <Button
            size='large'
            color='inherit'
            onClick={onClick ?? handleClick}
            {...rest}>
            {children}
        </Button>
    ) : (
        <MenuItem
            onClick={onClick ?? handleClick}
            {...rest}>
            {children}
        </MenuItem>
    );
};

export default Shortcut;

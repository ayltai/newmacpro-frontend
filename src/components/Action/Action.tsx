import { Badge, Button, Fab, IconButton, SpeedDial, useTheme, Zoom, } from '@mui/material';
import React, { Children, FC, useState, } from 'react';

import { ActionProps, } from './Action.types';

/**
 * Actions allow users to take actions, and make choices, with a single tap.
 * @param mode Specify the display mode to use. `default` is a button with text. `floating` is a floating action button.
 * @param color The color of the component. It supports both default and theme colors.
 * @param icon An element placed before the children.
 * @param badge Specify the badge content to be displayed on the top-right corner of the component.
 * @param children The content of the component.
 * @param onClick The event handler called when the component is clicked.
 * @param rest The other props passed down to the component.
 */
const Action : FC<ActionProps> = ({
    mode  = 'default',
    color = 'inherit',
    icon,
    badge,
    children,
    onClick,
    ...rest
}) => {
    const [ open, setOpen, ] = useState(false);

    const theme = useTheme();

    const transitionDuration = {
        enter : theme.transitions.duration.enteringScreen,
        exit  : theme.transitions.duration.leavingScreen,
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const defaultButton = !icon || children ? (
        <Button
            color={color}
            variant='contained'
            startIcon={icon}
            onClick={onClick}
            {...rest}>
            {children}
        </Button>
    ) : (
        <IconButton
            color={color}
            onClick={onClick}
            {...rest}>
            {icon}
        </IconButton>
    );

    const button = mode === 'floating' ? (
        <Zoom
            unmountOnExit
            style={{
                transitionDelay : `${badge ? 0 : transitionDuration.exit}ms`,
            }}
            in={!!badge}
            timeout={transitionDuration}>
            {Children.count(children) > 1 ? (
                <SpeedDial
                    sx={{
                        position : 'fixed',
                        right    : 32,
                        bottom   : 32,
                    }}
                    ariaLabel={rest.ariaLabel}
                    icon={icon}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}>
                    {children}
                </SpeedDial>
            ) : (
                <Fab
                    sx={{
                        position : 'fixed',
                        right    : 32,
                        bottom   : 32,
                        zIndex   : 1100,
                    }}
                    color={color}
                    variant={children ? 'extended' : 'circular'}
                    onClick={onClick}
                    {...rest}>
                    {icon}
                    {children}
                </Fab>
            )}
        </Zoom>
    ) : defaultButton;

    return badge ? (
        <Badge
            sx={mode === 'floating' ? {
                position : 'fixed',
                right    : 32,
                bottom   : 92,
            } : undefined}
            color='secondary'
            badgeContent={badge}>
            {button}
        </Badge>
    ) : button;
};

export default Action;

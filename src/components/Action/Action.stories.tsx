import { LaptopMac as MacIcon, PhoneIphone as IphoneIcon, } from '@mui/icons-material';
import { SpeedDialAction, } from '@mui/material';
import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import Action from './Action';

const meta : Meta<typeof Action> = {
    component : Action,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        mode     : {
            description : 'Specify the display mode to use. `default` is a button with text. `floating` is a floating action button.',
        },
        color    : {
            description : 'The color of the component. It supports both default and theme colors.',
        },
        icon     : {
            control     : false,
            description : 'An element placed before the content.',
        },
        badge    : {
            description : 'Specify the badge content to be displayed on the top-right corner of the component.',
        },
        children : {
            control     : false,
            description : 'The content of the component.',
        },
        onClick  : {
            description : 'An event handler called when the component is clicked.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Action>;

/**
 * An Action component with default props.
 */
export const Default : Story = {
    args : {
        mode     : 'default',
        color    : 'inherit',
        children : 'Default',
    },
};

/**
 * An Action component in `primary` color with an icon placed before the content.
 */
export const Icon : Story = {
    name : 'With icon',
    args : {
        ...Default.args,
        color    : 'primary',
        icon     : <MacIcon />,
        children : 'With icon',
    },
};

/**
 * An Action component showing as a floating action button in `primary` color with a badge placed on the top-right corner of the component.
 */
export const FloatingWithBadge : Story = {
    name       : 'Floating with badge',
    args       : {
        ...Icon.args,
        mode     : 'floating',
        icon     : <IphoneIcon />,
        badge    : 2,
        children : 'Checkout',
    },
    parameters : {
        docs : {
            story : {
                inline       : false,
                iframeHeight : 200,
            },
        },
    },
};

export const FloatingWithBadgeAndOptions : Story = {
    name       : 'Floating with badge and options',
    args       : {
        ...FloatingWithBadge.args,
        children : (
            <>
                <SpeedDialAction
                    key='Mac'
                    icon={<MacIcon />}
                    tooltipOpen
                    tooltipTitle='Mac' />
                <SpeedDialAction
                    key='iPhone'
                    icon={<IphoneIcon />}
                    tooltipOpen
                    tooltipTitle='iPhone' />
            </>
        ),
    },
    parameters : {
        docs : {
            story : {
                inline       : false,
                iframeHeight : 200,
            },
        },
    },
};

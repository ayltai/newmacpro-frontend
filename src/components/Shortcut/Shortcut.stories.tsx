import type { Meta, StoryObj, } from '@storybook/react';

import Shortcut from './Shortcut';

const meta : Meta<typeof Shortcut> = {
    component : Shortcut,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        mode     : {
            description : 'Specify the display mode to use. `desktop` is a text button. `mobile` is a menu item. If not provided, the mode is determined by the screen size.',
        },
        anchor   : {
            description : 'The `href` attribute of the anchored element to navigate to if `onClick` is not provided.',
        },
        onClick  : {
            description : 'An event handler called when the component is clicked.',
        },
        children : {
            control     : false,
            description : 'The content of the component.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Shortcut>;

/**
 * Desktop mode.
 */
export const Desktop : Story = {
    args : {
        mode     : 'desktop',
        children : 'Desktop mode',
    },
};

/**
 * Mobile mode.
 */
export const Mobile : Story = {
    args : {
        mode     : 'mobile',
        children : 'Mobile mode',
    },
};

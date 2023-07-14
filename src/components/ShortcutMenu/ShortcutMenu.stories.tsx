import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import Shortcut from '../Shortcut';
import ShortcutMenu from './ShortcutMenu';

const meta : Meta<typeof ShortcutMenu> = {
    component : ShortcutMenu,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        children : {
            control     : false,
            description : 'The content of the component.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Shortcut>;

/**
 * A shortcut menu with default props.
 */
export const Default : Story = {
    args : {
        children : [
            <Shortcut key='1'>Cut</Shortcut>,
            <Shortcut key='2'>Copy</Shortcut>,
            <Shortcut key='3'>Paste</Shortcut>,
        ],
    },
};

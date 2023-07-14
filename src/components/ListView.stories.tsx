import type { Meta, StoryObj, } from '@storybook/react';

import { POPULAR_APPS, } from '../constants';
import { ListView, } from './ListView';

const meta : Meta<typeof ListView> = {
    component : ListView,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        packages : {
            control     : false,
            description : 'The list of packages to display.',
        },
        maxRows  : {
            description : 'The maximum number of rows to display.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof ListView>;

/**
 * A ListView with default props.
 */
export const Default : Story = {
    args : {
        packages : POPULAR_APPS,
    },
};

/**
 * A ListView with a limited number of rows.
 */
export const LimitedRows : Story = {
    args : {
        ...Default.args,
        maxRows : 5,
    },
};

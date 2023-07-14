import type { Meta, StoryObj, } from '@storybook/react';

import SearchBox from './SearchBox';

const meta : Meta<typeof SearchBox> = {
    component : SearchBox,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        isLoading : {
            description : 'If `true`, the component is in the loading state.',
        },
        hint      : {
            description : 'The hint content to be displayed.',
        },
        onSearch  : {
            description : 'An event handler called when the search keyword is changed.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

/**
 * A SearchBox component with default props.
 */
export const Default : Story = {
    args : {
        hint : 'Type something to search...',
    },
};

/**
 * A SearchBox component in loading state.
 */
export const Loading : Story = {
    args : {
        ...Default.args,
        isLoading : true,
    },
};

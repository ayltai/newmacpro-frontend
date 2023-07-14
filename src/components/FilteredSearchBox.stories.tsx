import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import Provider, { defaultStore, } from '../../.storybook/Provider';
import FilteredSearchBox from './FilteredSearchBox';

const meta : Meta<typeof FilteredSearchBox> = {
    component : FilteredSearchBox,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        isLoading : {
            type        : 'boolean',
            description : 'If `true`, the component is in the loading state.',
        },
        hint      : {
            type         : 'string',
            defaultValue : '',
            description  : 'The hint content to be displayed.',
        },
        onSearch  : {
            type        : 'function',
            description : 'An event handler called when the search keyword is changed.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof FilteredSearchBox>;

export const Default : Story = {
    args       : {
        hint : 'Type something to search...',
    },
    decorators : [
        (story) => (
            <Provider store={defaultStore}>
                {story()}
            </Provider>
        ),
    ],
};

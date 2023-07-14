import type { Meta, StoryObj, } from '@storybook/react';

import { CopyableTextField, } from './CopyableTextField';

const meta : Meta<typeof CopyableTextField> = {
    component : CopyableTextField,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        copyText : {
            description : 'The text to display on the Copy button.',
        },
        copyHint : {
            description : 'The message to display when text is copied.',
        },
        value : {
            description : 'The text to display and to be copied.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof CopyableTextField>;

/**
 * A CopyableTextField with default props.
 */
export const Default : Story = {
    args : {
        copyText : 'Copy',
        copyHint : 'Copied!',
        value    : 'This is some text.',
    },
};

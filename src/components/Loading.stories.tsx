import type { Meta, StoryObj, } from '@storybook/react';

import { Loading, } from './Loading';

const meta : Meta<typeof Loading> = {
    component : Loading,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        show    : {
            description : 'If `true`, the component is shown.',
        },
        message : {
            description : 'The message to display.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Loading>;

/**
 * A Loading component with default props.
 */
export const Default : Story = {
    args       : {
        show    : true,
        message : 'Loading ...',
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

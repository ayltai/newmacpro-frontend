import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import CardDescription from './CardDescription';
import CardImage from './CardImage';
import CardTitle from './CardTitle';
import SelectableCardView from './SelectableCardView';

const meta : Meta<typeof SelectableCardView> = {
    component : SelectableCardView,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        children : {
            control     : false,
            description : 'The content of the component.',
        },
        onSelect   : {
            description : 'An event handler called when the card selection state is changed.',
        },
        onMoreInfo : {
            description : 'An event handler called when the "More Info" button is clicked.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof SelectableCardView>;

/**
 * A SelectableCardView with default props.
 */
export const Default : Story = {
    args : {
        children : [
            <CardImage
                key='image'
                height={180}
                imageUrl='/images/newmac-1.webp'
                altText='NewMac.Pro' />,
            <CardTitle key='title'>Firefox</CardTitle>,
            <CardDescription key='description'>A web browser</CardDescription>,
        ],
    },
};

import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import CardDescription from '../CardDescription';
import CardImage from '../CardImage';
import CardTitle from '../CardTitle';
import SelectableCardView from '../SelectableCardView';
import GridView from './GridView';

const meta : Meta<typeof GridView> = {
    component : GridView,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        expanded : {
            description : 'Whether the GridView should be expanded to show all the contents.',
        },
        maxRows  : {
            description : 'The maximum number of rows to display.',
        },
        children : {
            control     : false,
            description : 'The content of the component. Normally CardView components.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof GridView>;

/**
 * A GridView with default props.
 */
export const Default : Story = {
    args : {
        children : Array.from(Array(10)).map((_, index) => (
            <SelectableCardView
                key={_}
                align='center'>
                <CardImage
                    height={180}
                    imageUrl={`/images/newmac-${1 + Math.floor(Math.random() * 4)}.webp`}
                    altText='NewMac.Pro' />
                <CardTitle>{`Firefox (${index + 1})`}</CardTitle>
                <CardDescription>A web browser</CardDescription>
            </SelectableCardView>
        )),
    },
};

export const Collapsed : Story = {
    args : {
        ...Default.args,
        expanded : false,
        maxRows  : 2,
    },
};

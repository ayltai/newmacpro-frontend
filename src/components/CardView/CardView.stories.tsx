import type { Meta, StoryObj, } from '@storybook/react';
import React from 'react';

import { POPULAR_APPS, } from '../../constants';
import CardContent from '../CardContent';
import CardDescription from '../CardDescription';
import CardImage from '../CardImage';
import CardTitle from '../CardTitle';
import { ListView, } from '../ListView';
import CardView from './CardView';

const meta : Meta<typeof CardView> = {
    component : CardView,
    tags      : [
        'autodocs',
    ],
    argTypes  : {
        align    : {
            description : 'The alignment of the content.',
        },
        children : {
            control     : false,
            description : 'The content of the component.',
        },
        onClick  : {
            description : 'An event handler called when the component is clicked.',
        },
        onMoreInfo : {
            description : 'An event handler called when the "More Info" button is clicked.',
        },
    },
};

export default meta;

type Story = StoryObj<typeof CardView>;

/**
 * A CardView with default props.
 */
export const Default : Story = {
    args : {
        children : [
            <CardTitle key='title'>Firefox</CardTitle>,
            <CardDescription key='description'>A web browser</CardDescription>,
        ],
    },
};

/**
 * A CardView with an image and contents center aligned.
 */
export const WithImage : Story = {
    name : 'With image',
    args : {
        align    : 'center',
        children : [
            <CardTitle key='title'>Firefox</CardTitle>,
            <CardDescription key='description'>A web browser</CardDescription>,
            <CardImage
                key='image'
                height={180}
                imageUrl='/images/newmac-1.webp'
                altText='NewMac.Pro' />,
        ],
    },
};

/**
 * A CardView with contents left aligned.
 */
export const WithContent : Story = {
    name : 'With content',
    args : {
        align    : 'left',
        children : [
            <CardTitle key='title'>Firefox</CardTitle>,
            <CardDescription key='description'>A web browser</CardDescription>,
            <CardContent key='content'>
                <ListView
                    packages={POPULAR_APPS} />
            </CardContent>,
        ],
    },
};

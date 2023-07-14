import React from 'react';

import { render, } from '../../utils/test';
import CardDescription from '../CardDescription';
import CardImage from '../CardImage';
import CardTitle from '../CardTitle';
import SelectableCardView from '../SelectableCardView';
import GridView from './GridView';

describe('<GridView />', () => {
    it('renders correctly', () => {
        expect(render(
            <GridView>
                {Array.from(Array(10)).map((_, index) => (
                    <SelectableCardView
                        key={`index-${index}`}
                        align='center'>
                        <CardImage
                            height={180}
                            imageUrl={`/images/newmac-${1 + index % 4}.webp`}
                            altText='NewMac.Pro' />
                        <CardTitle>{`Firefox (${index + 1})`}</CardTitle>
                        <CardDescription>A web browser</CardDescription>
                    </SelectableCardView>
                ))}
            </GridView>
        )).toMatchSnapshot();
    });
});

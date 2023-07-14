import React from 'react';

import { fireEvent, render, } from '../../utils/test';
import CardDescription from '../CardDescription';
import CardTitle from '../CardTitle';
import CardView from './CardView';

const children = [
    <CardTitle key='title'>Firefox</CardTitle>,
    <CardDescription key='description'>A web browser</CardDescription>,
];

describe('<CardView />', () => {
    it('renders correctly', () => {
        expect(render(<CardView>{children}</CardView>)).toMatchSnapshot();
    });

    it('handles click event correctly', () => {
        const handleClick = jest.fn();

        const { getAllByRole, } = render(
            <CardView onClick={handleClick}>
                {children}
            </CardView>
        );

        fireEvent.click(getAllByRole('button')[0]);

        expect(handleClick).toBeCalledTimes(1);
    });

    it('handles more-info event correctly', () => {
        const handleMoreInfo = jest.fn();

        const { getAllByRole, } = render(
            <CardView onMoreInfo={handleMoreInfo}>
                {children}
            </CardView>
        );

        fireEvent.click(getAllByRole('button')[1]);

        expect(handleMoreInfo).toBeCalledTimes(1);
    });
});

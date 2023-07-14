import { Laptop as LaptopIcon, } from '@mui/icons-material';
import React from 'react';

import { fireEvent, render, } from '../../utils/test';
import Action from './Action';

describe('<Action />', () => {
    it('renders default style correctly', () => {
        const handleClick = jest.fn();

        expect(render(<Action onClick={handleClick}>Dummy</Action>)).toMatchSnapshot();
    });

    it('renders floating style correctly', () => {
        const handleClick = jest.fn();

        expect(render(
            <Action
                mode='floating'
                onClick={handleClick}>
                Dummy
            </Action>
        )).toMatchSnapshot();
    });

    it('renders icon style correctly', () => {
        const handleClick = jest.fn();

        expect(render(
            <Action
                icon={<LaptopIcon />}
                onClick={handleClick}>
                Dummy
            </Action>
        )).toMatchSnapshot();
    });

    it('renders badge correctly', () => {
        const handleClick = jest.fn();

        expect(render(
            <Action
                badge={1}
                onClick={handleClick}>
                Dummy
            </Action>
        )).toMatchSnapshot();
    });

    it('handles click event correctly', () => {
        const handleClick = jest.fn();

        const { getByRole, } = render(
            <Action onClick={handleClick}>
                Dummy
            </Action>
        );

        fireEvent.click(getByRole('button'));

        expect(handleClick).toBeCalledTimes(1);
    });
});

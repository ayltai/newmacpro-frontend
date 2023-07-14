import React from 'react';

import { fireEvent, render, } from '../../utils/test';
import { default as FooterLink, } from './FooterLink';

describe('<FooterLink />', () => {
    it('renders correctly', () => {
        expect(render(<FooterLink>Dummy</FooterLink>)).toMatchSnapshot();
    });

    it('handles click event correctly', () => {
        const handleClick = jest.fn();

        const { getByRole, } = render(
            <FooterLink onClick={handleClick}>
                Dummy
            </FooterLink>
        );

        fireEvent.click(getByRole('link'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

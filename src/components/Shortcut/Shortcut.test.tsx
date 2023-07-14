import React from 'react';

import { fireEvent, render, } from '../../utils/test';
import Shortcut from './Shortcut';

describe('<Shortcut />', () => {
    it('renders correctly', () => expect(render(<Shortcut>Dummy</Shortcut>)).toMatchSnapshot());

    it('navigates to anchor when clicked', () => {
        const { getByRole, } = render(<Shortcut anchor='dummy'>Dummy</Shortcut>);

        fireEvent.click(getByRole('menuitem'));

        expect(window.location.href).toBe('http://localhost/#dummy');
    });
});

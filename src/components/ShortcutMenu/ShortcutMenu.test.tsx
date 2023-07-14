import React from 'react';

import { fireEvent, render, } from '../../utils/test';
import Shortcut from '../Shortcut';
import ShortcutMenu from './ShortcutMenu';

const component = (
    <ShortcutMenu>
        <Shortcut>Copy</Shortcut>
        <Shortcut>Paste</Shortcut>
    </ShortcutMenu>
);

describe('<ShortcutMenu />', () => {
    it('renders correctly', () => expect(render(component)).toMatchSnapshot());

    it('opens the menu when clicked', () => {
        const { getByRole, } = render(component);

        fireEvent.click(getByRole('button'));

        expect(getByRole('menu')).not.toBeNull();
    });
});

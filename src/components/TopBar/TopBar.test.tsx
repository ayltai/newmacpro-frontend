import React from 'react';

import { render, } from '../../utils/test';
import { default as Branding, } from '../Branding';
import { default as Shortcut, } from '../Shortcut';
import TopBar from './TopBar';

describe('<TopBar />', () => {
    it('renders correctly', () => {
        expect(render(
            <TopBar>
                <Branding>Branding</Branding>
                <Shortcut anchor='shortcut-1'>Shortcut 1</Shortcut>
                <Shortcut anchor='shortcut-2'>Shortcut 2</Shortcut>
            </TopBar>
        )).toMatchSnapshot();
    });
});

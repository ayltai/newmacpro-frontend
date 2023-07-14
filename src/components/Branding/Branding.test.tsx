import React from 'react';

import { render, } from '../../utils/test';
import Branding from './Branding';

describe('<Branding />', () => {
    it('renders correctly', () => expect(render(<Branding>Dummy</Branding>)).toMatchSnapshot());
});

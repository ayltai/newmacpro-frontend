import React from 'react';

import { render, } from '../../utils/test';
import Description from './Description';

describe('<Description />', () => {
    it('renders correctly', () => expect(render(<Description>Dummy</Description>)).toMatchSnapshot());
});

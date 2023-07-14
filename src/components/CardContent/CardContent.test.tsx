import React from 'react';

import { render, } from '../../utils/test';
import CardContent from './CardContent';

describe('<CardContent />', () => {
    it('renders correctly', () => expect(render(<CardContent>Dummy</CardContent>)).toMatchSnapshot());
});

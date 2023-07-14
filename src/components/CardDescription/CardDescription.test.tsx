import React from 'react';

import { render, } from '../../utils/test';
import CardDescription from './CardDescription';

describe('<CardDescription />', () => {
    it('renders correctly', () => expect(render(<CardDescription>Dummy</CardDescription>)).toMatchSnapshot());
});

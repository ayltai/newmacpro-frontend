import React from 'react';

import { render, } from '../../utils/test';
import CardTitle from './CardTitle';

describe('<CardTitle />', () => {
    it('renders correctly', () => expect(render(<CardTitle>Dummy</CardTitle>)).toMatchSnapshot());
});

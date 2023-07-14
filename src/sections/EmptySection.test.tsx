import React from 'react';

import { render, } from '../utils/test';
import { EmptySection, } from './EmptySection';

describe('<EmptySection />', () => {
    it('renders correctly', () => expect(render(<EmptySection>Dummy</EmptySection>)).toMatchSnapshot());
});

import React from 'react';

import { render, } from '../../utils/test';
import SectionTitle from './SectionTitle';

describe('<SectionTitle />', () => {
    it('renders correctly', () => expect(render(<SectionTitle>Dummy</SectionTitle>)).toMatchSnapshot());
});

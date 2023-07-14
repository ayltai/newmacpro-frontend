import React from 'react';

import { render, } from '../../utils/test';
import SectionContent from './SectionContent';

describe('<SectionContent />', () => {
    it('renders correctly', () => expect(render(<SectionContent>Dummy</SectionContent>)).toMatchSnapshot());
});

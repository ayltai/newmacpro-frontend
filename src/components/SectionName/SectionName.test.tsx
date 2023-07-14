import React from 'react';

import { render, } from '../../utils/test';
import SectionName from './SectionName';

describe('<SectionName />', () => {
    it('renders correctly', () => expect(render(<SectionName>Dummy</SectionName>)).toMatchSnapshot());
});

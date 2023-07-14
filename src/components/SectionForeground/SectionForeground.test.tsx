import React from 'react';

import { render, } from '../../utils/test';
import SectionForeground from './SectionForeground';

describe('<SectionForeground />', () => {
    it('renders correctly', () => expect(render(<SectionForeground>Dummy</SectionForeground>)).toMatchSnapshot());
});

import React from 'react';

import { render, } from '../../utils/test';
import PageContent from './PageContent';

describe('<PageContent />', () => {
    it('renders correctly', () => expect(render(<PageContent>Dummy</PageContent>)).toMatchSnapshot());
});

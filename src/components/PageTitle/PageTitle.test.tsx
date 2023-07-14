import React from 'react';

import { render, } from '../../utils/test';
import PageTitle from './PageTitle';

describe('<PageTitle />', () => {
    it('renders correctly', () => expect(render(<PageTitle>Dummy</PageTitle>)).toMatchSnapshot());
});

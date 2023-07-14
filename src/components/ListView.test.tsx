import React from 'react';

import { render, } from '../utils/test';
import { POPULAR_APPS, } from '../constants';
import { ListView, } from './ListView';

describe('<ListView />', () => {
    it('renders correctly', () => {
        expect(render(
            <ListView
                packages={POPULAR_APPS} />
        )).toMatchSnapshot();
    });
});

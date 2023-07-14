import React from 'react';

import { fireEvent, render, } from '../utils/test';
import { SearchSection, } from './SearchSection';

describe('<SearchSection />', () => {
    it('shows a <FilteredSearchBox />', () => {
        const { getByRole, } = render(<SearchSection />);

        expect(getByRole('textbox')).toBeInTheDocument();

        fireEvent.click(getByRole('button'));

        expect(getByRole('menu')).toBeInTheDocument();
    });
});

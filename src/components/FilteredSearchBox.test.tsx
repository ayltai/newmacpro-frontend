import React from 'react';

import { SearchFilter, } from '../types';
import { fireEvent, render, waitFor, } from '../utils/test';

import FilteredSearchBox from './FilteredSearchBox';

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch : () => mockUseDispatch,
}));

describe('<FilteredSearchBox />', () => {
    beforeEach(() => mockUseDispatch.mockClear());

    it('renders correctly', () => expect(render(<FilteredSearchBox />).asFragment()).toMatchSnapshot());

    it('adds filter when filter is selected', async () => {
        const { getByRole, } = render(<FilteredSearchBox />);

        fireEvent.click(getByRole('button'));

        expect(getByRole('menu')).toBeInTheDocument();

        fireEvent.click(getByRole('menuitem', {
            name : 'Include apps',
        }));

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : 'pref/removeFilter',
                payload : SearchFilter.Apps,
            });
        });
    });
});

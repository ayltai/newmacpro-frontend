import React from 'react';

import { fireEvent, render, waitFor, } from '../../utils/test';
import SearchBox from './SearchBox';

describe('<SearchBox />', () => {
    it('renders correctly', () => expect(render(<SearchBox />).asFragment()).toMatchSnapshot());

    it('triggers onSearch when input text changed', async () => {
        const handleSearch = jest.fn();

        const { getByRole, } = render(<SearchBox onSearch={handleSearch} />);

        expect(handleSearch).toBeCalledTimes(1);
        expect(handleSearch).toBeCalledWith('');

        fireEvent.change(getByRole('textbox'), {
            target : {
                value : 'dummy',
            },
        });

        await waitFor(() => {
            expect(handleSearch).toBeCalledTimes(2);
            expect(handleSearch).toBeCalledWith('dummy');
        });
    });
});

import React from 'react';

import { POPULAR_APPS, } from '../constants';
import { fireEvent, render, waitFor, } from '../utils/test';
import { GridViewSection, } from './GridViewSection';

const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch : () => mockUseDispatch,
}));

describe('<GridViewSection />', () => {
    beforeEach(() => mockUseDispatch.mockClear());

    it('expands correctly', () => {
        const { getAllByRole, } = render(
            <GridViewSection
                title='Dummy'
                maxRows={1}
                packages={POPULAR_APPS} />
        );

        expect(getAllByRole('button')).toHaveLength(4);

        fireEvent.click(getAllByRole('button')[getAllByRole('button').length - 1]);

        expect(getAllByRole('button')).toHaveLength(getAllByRole('button').length);
    });

    it('selects an item correctly', async () => {
        const { getAllByRole, } = render(
            <GridViewSection
                title='Dummy'
                maxRows={1}
                packages={POPULAR_APPS} />
        );

        fireEvent.click(getAllByRole('button')[1]);

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : 'cart/addPackage',
                payload : POPULAR_APPS[0],
            });
        });
    });

    it('deselects an item correctly', async () => {
        const { getAllByRole, } = render(
            <GridViewSection
                title='Dummy'
                maxRows={1}
                packages={POPULAR_APPS} />,
            {
                preloadedState : {
                    cart : {
                        packages : [
                            POPULAR_APPS[0],
                        ],
                    },
                    pref : {
                        filters : [],
                    },
                },
            },
        );

        fireEvent.click(getAllByRole('button')[1]);

        await waitFor(() => {
            expect(mockUseDispatch).toHaveBeenCalledTimes(1);
            expect(mockUseDispatch).toHaveBeenCalledWith({
                type    : 'cart/removePackage',
                payload : POPULAR_APPS[0],
            });
        });
    });
});

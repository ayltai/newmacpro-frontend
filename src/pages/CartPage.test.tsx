import React from 'react';

import { POPULAR_APPS, POPULAR_TWEAKS, } from '../constants';
import { mockApis, render, waitFor, } from '../utils/test';
import { CartPage, } from './CartPage';

describe('<CartPage />', () => {
    it('renders correctly', async () => {
        await mockApis({
            id       : '1',
            packages : [
                POPULAR_APPS[0],
            ],
        });

        const component = render(<CartPage open />, {
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
        });

        await waitFor(() => expect(component).toMatchSnapshot());
    });

    it('renders note for App Store packages', async () => {
        await mockApis({
            id       : '1',
            packages : [
                {
                    ...POPULAR_APPS[0],
                    source : 'App Store',
                },
            ],
        });

        const { getAllByRole, } = render(<CartPage open />, {
            preloadedState : {
                cart : {
                    packages : [
                        {
                            ...POPULAR_APPS[0],
                            source : 'App Store',
                        },
                    ],
                },
                pref : {
                    filters : [],
                },
            },
        });

        await waitFor(() => {
            expect(getAllByRole('link')[0]).toHaveTextContent('note.app_store');
        });
    });

    it('renders note for tweaks', async () => {
        await mockApis({
            id       : '1',
            packages : [
                POPULAR_TWEAKS[0],
            ],
        });

        const { getAllByRole, } = render(<CartPage open />, {
            preloadedState : {
                cart : {
                    packages : [
                        POPULAR_TWEAKS[0],
                    ],
                },
                pref : {
                    filters : [],
                },
            },
        });

        await waitFor(() => {
            expect(getAllByRole('link')[0]).toHaveTextContent('note.tweak');
        });
    });

    it('does not render any notes', async () => {
        await mockApis({
            id       : '1',
            packages : [
                POPULAR_APPS[0],
            ],
        });

        const { queryAllByRole, } = render(<CartPage open />, {
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
        });

        await waitFor(() => {
            expect(queryAllByRole('link')).toHaveLength(0);
        });
    });
});

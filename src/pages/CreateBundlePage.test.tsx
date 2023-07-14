import React from 'react';

import { bundleApi, } from '../apis';
import { POPULAR_APPS, } from '../constants';
import { act, fireEvent, mockApis, render, } from '../utils/test';
import { CreateBundlePage, } from './CreateBundlePage';

describe('<CreateBundlePage />', () => {
    it('renders correctly', async () => {
        await mockApis();

        expect(render(
            <CreateBundlePage
                open
                idToken='idToken' />,
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
            }
        )).toMatchSnapshot();
    });

    it('calls Create Bundle API when Create button is clicked', async () => {
        await mockApis();

        const initiate = jest.spyOn(bundleApi.endpoints?.createBundle, 'initiate');

        const { getByRole, } = render(
            <CreateBundlePage
                open
                idToken='idToken' />,
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
            }
        );

        await act(() => fireEvent.click(getByRole('button')));

        expect(initiate).toHaveBeenCalledTimes(1);
    });
});

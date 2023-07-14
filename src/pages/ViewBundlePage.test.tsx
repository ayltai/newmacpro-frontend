import React from 'react';

import { bundleApi, } from '../apis';
import { fireEvent, mockApis, render, waitFor, } from '../utils/test';
import { ViewBundlePage, } from './ViewBundlePage';

describe('<ViewBundlePage />', () => {
    beforeEach(async () => {
        await mockApis();
    });

    it('renders correctly', async () => {
        const component = render(
            <ViewBundlePage
                open
                bundleId='1' />
        );

        await waitFor(() => {
            expect(component).toMatchSnapshot();
        });
    });

    it('hides Update and Delete buttons for guest user', async () => {
        const { queryAllByRole, } = render(
            <ViewBundlePage
                open
                bundleId='1' />
        );

        await waitFor(() => {
            expect(queryAllByRole('button')).toHaveLength(0);
        });
    });

    it('shows Update and Delete buttons for authenticated user', async () => {
        const { queryAllByRole, } = render(
            <ViewBundlePage
                open
                bundleId='1'
                idToken='idToken' />
        );

        await waitFor(() => {
            expect(queryAllByRole('button')).toHaveLength(2);
            expect(queryAllByRole('button')[0]).toHaveTextContent('action.update_bundle');
            expect(queryAllByRole('button')[1]).toHaveTextContent('action.delete_bundle');
        });
    });

    it('calls Update Bundle API when Update button is clicked', async () => {
        const initiate = jest.spyOn(bundleApi.endpoints?.updateBundle, 'initiate');

        const { getAllByRole, } = render(
            <ViewBundlePage
                open
                bundleId='1'
                idToken='idToken' />
        );

        await waitFor(() => {
            fireEvent.click(getAllByRole('button')[0]);
        });

        expect(initiate).toHaveBeenCalledTimes(1);
    });

    it('calls Delete Bundle API when Delete button is clicked', async () => {
        const initiate = jest.spyOn(bundleApi.endpoints?.deleteBundle, 'initiate');

        const { getAllByRole, } = render(
            <ViewBundlePage
                open
                bundleId='1'
                idToken='idToken' />
        );

        await waitFor(() => {
            fireEvent.click(getAllByRole('button')[1]);
        });

        expect(initiate).toHaveBeenCalledTimes(1);
    });
});

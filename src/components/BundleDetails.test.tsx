import React from 'react';

import { POPULAR_APPS, } from '../constants';
import type { Bundle, } from '../types';
import { fireEvent, render, } from '../utils/test';
import { BundleDetails, } from './BundleDetails';

const BUNDLE : Bundle = {
    id          : '1',
    displayName : 'Test Bundle',
    packages    : [
        POPULAR_APPS[0],
    ],
};

describe('<BundleDetails />', () => {
    it('renders correctly', () => {
        expect(render(
            <BundleDetails bundle={BUNDLE} />
        )).toMatchSnapshot();
    });

    it('generates a default display name', () => {
        const { getAllByRole, } = render(
            <BundleDetails bundle={{
                ...BUNDLE,
                displayName : undefined,
            }} />
        );

        expect(getAllByRole('textbox')[0]).toHaveTextContent('');
    });

    it('triggers onChange when the description changes', () => {
        const onChange = jest.fn();

        const { getAllByRole, } = render(
            <BundleDetails
                bundle={BUNDLE}
                onChange={onChange} />
        );

        fireEvent.change(getAllByRole('textbox')[1], {
            target : {
                value : 'Dummy',
            },
        });

        expect(onChange).toBeCalledTimes(1);
        expect(onChange).toBeCalledWith({
            ...BUNDLE,
            description : 'Dummy',
        });
    });
});

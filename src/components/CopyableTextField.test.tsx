import React from 'react';

import { fireEvent, render, waitFor, } from '../utils/test';
import { CopyableTextField, } from './CopyableTextField';

const DUMMY_VALUE = 'dummy value';

Object.assign(navigator, {
    clipboard: {
        writeText : jest.fn(),
    },
});

const component = (
    <CopyableTextField
        copyText='Copy'
        copyHint='Copied!'
        value={DUMMY_VALUE} />
);

describe('<CopyableTextField />', () => {
    const mockedWriteText = jest.spyOn(navigator.clipboard, 'writeText');

    it('renders correctly', () => expect(render(component)).toMatchSnapshot());

    it('copies text field value to clipboard', async () => {
        const { getByRole, } = render(component);

        fireEvent.click(getByRole('button'));

        await waitFor(() => {
            expect(mockedWriteText).toHaveBeenCalledWith(DUMMY_VALUE);
        });
    });
});

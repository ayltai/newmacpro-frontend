import React from 'react';

import { act, render, } from '../utils/test';
import { Message, } from './Message';

describe('<Message />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    it('renders correctly', () => {
        expect(render(
            <Message
                open={true}
                message='Dummy' />
        )).toMatchSnapshot();
    });

    it('closes automatically', () => {
        const onClose = jest.fn();

        render(
            <Message
                open={true}
                message='Dummy'
                onClose={onClose} />
        );

        expect(onClose).not.toBeCalled();

        act(() => {
            jest.runOnlyPendingTimers();

            expect(onClose).toBeCalledTimes(1);
        });
    });
});

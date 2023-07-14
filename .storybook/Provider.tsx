import { configureStore, Store, } from '@reduxjs/toolkit';
import React, { ReactNode, } from 'react';
import { Provider, } from 'react-redux';
import { cartReducer, prefReducer } from '../src/states';

export const createStore = (preloadedState? : Record<string, any>) => configureStore({
    reducer : {
        cart : cartReducer,
        pref : prefReducer,
    },
    preloadedState,
});

export const defaultStore = createStore();

type RootState = ReturnType<typeof defaultStore.getState>;

const ProviderWrapper = ({
    children,
    store = defaultStore,
} : {
    children ?: ReactNode,
    store?    : Store<RootState>,
}) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default ProviderWrapper;

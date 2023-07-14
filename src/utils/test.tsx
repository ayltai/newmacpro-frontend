import { ThemeProvider, } from '@mui/material';
import { configureStore, Store, } from '@reduxjs/toolkit';
import { act, render, } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import { ConfirmProvider, } from 'material-ui-confirm';
import React, { ReactNode, } from 'react';
import { Provider, } from 'react-redux';

import { bundleApi, cartApi, } from '../apis';
import { POPULAR_APPS, } from '../constants';
import { cartReducer, prefReducer, store as reduxStore, } from '../states';
import { AppTheme, } from '../styles';
import { Cart, } from '../types';

export const mockApis = async (cart? : Cart) => {
    fetchMock.doMock(request => {
        if (request.url.endsWith('/api/bundles') && request.method === 'POST') return Promise.resolve({
            status : 201,
            body   : 'Created',
        });

        if (request.url.endsWith('/api/bundles/1') && request.method === 'GET') return Promise.resolve({
            status : 200,
            body   : JSON.stringify({
                id          : '1',
                displayName : 'Dummy',
                packages    : [
                    POPULAR_APPS[0],
                ],
            }),
        });

        if (request.url.endsWith('/api/bundles/1') && request.method === 'DELETE') return Promise.resolve({
            status : 200,
            body   : 'OK',
        });

        if (request.url.endsWith('/api/carts') && request.method === 'POST') return Promise.resolve({
            status : 201,
            body   : 'Created',
        });

        return Promise.resolve({
            status : 404,
            body   : 'Not found',
        });
    });

    await act(async () => {
        await reduxStore.dispatch(bundleApi.endpoints?.getBundle.initiate({
            bundleId : '1',
            idToken  : 'idToken',
        }));
        if (cart) await reduxStore.dispatch(cartApi.endpoints.addCart.initiate(cart));
    });
};

export const createMatchMedia = (width : number) => (query : string) => ({
    matches             : mediaQuery.match(query, {
        width,
    }),
    media               : '',
    onchange            : null,
    addListener         : () => {},
    removeListener      : () => {},
    addEventListener    : () => {},
    removeEventListener : () => {},
    dispatchEvent       : () => false,
});

export const createStore = (preloadedState? : Record<string, any>) => configureStore({
    preloadedState,
    reducer    : {
        cart                      : cartReducer,
        pref                      : prefReducer,
        [ bundleApi.reducerPath ] : bundleApi.reducer,
        [ cartApi.reducerPath   ] : cartApi.reducer,
    },
    middleware : getDefaultMiddleware => getDefaultMiddleware().concat(bundleApi.middleware, cartApi.middleware),
});

export const defaultStore = createStore();

export type RootState = ReturnType<typeof defaultStore.getState>;

const customRender = (ui : any, {
    preloadedState,
    store = createStore(preloadedState),
    ...rest
} : {
    preloadedState?   : Record<string, any>,
    store?            : Store<RootState>,
    [ rest : string ] : any,
} = {}) => render(ui, {
    wrapper : ({
        children,
    } : {
        children : ReactNode,
    }) => (
        <Provider store={store}>
            <ThemeProvider theme={AppTheme}>
                <ConfirmProvider>
                    {children}
                </ConfirmProvider>
            </ThemeProvider>
        </Provider>
    ),
    ...rest,
});

export * from '@testing-library/react';

export { customRender as render, };

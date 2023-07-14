import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appStoreApi, bundleApi, cartApi, homebrewApi, tweakApi, } from '../apis';
import { cartReducer, } from './cartSlice';
import { prefReducer, } from './prefSlice';

export const store = configureStore({
    reducer    : persistReducer({
        key       : 'root',
        blacklist : [
            appStoreApi.reducerPath,
            bundleApi.reducerPath,
            cartApi.reducerPath,
            homebrewApi.reducerPath,
            tweakApi.reducerPath,
        ],
        storage,
    }, combineReducers({
        cart                        : cartReducer,
        pref                        : prefReducer,
        [ appStoreApi.reducerPath ] : appStoreApi.reducer,
        [ bundleApi.reducerPath   ] : bundleApi.reducer,
        [ cartApi.reducerPath     ] : cartApi.reducer,
        [ homebrewApi.reducerPath ] : homebrewApi.reducer,
        [ tweakApi.reducerPath    ] : tweakApi.reducer,
    })),
    middleware : getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck : {
            ignoredActions : [
                FLUSH,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER,
                REHYDRATE,
            ],
        },
    }).concat(appStoreApi.middleware, bundleApi.middleware, cartApi.middleware, homebrewApi.middleware, tweakApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { addPackage, addPackages, cartReducer, clearPackages, removePackage, removePackages, } from './cartSlice';
export { addFilter, prefReducer, removeFilter, } from './prefSlice';

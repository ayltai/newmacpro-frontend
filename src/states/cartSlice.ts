import { createSlice, PayloadAction, } from '@reduxjs/toolkit';

import type { Package, } from '../types';

type CartState = {
    packages : Package[],
};

const initialState : CartState = {
    packages : [],
};

const cartSlice = createSlice({
    initialState,
    name     : 'cart',
    reducers : {
        addPackage     : (state, action : PayloadAction<Package>) => ({
            packages : [
                ...state.packages,
                action.payload,
            ].sort((left, right) => left.id.localeCompare(right.id)),
        }),
        addPackages    : (state, action : PayloadAction<Package[]>) => ({
            packages : [
                ...state.packages,
                ...action.payload,
            ].sort((left, right) => left.id.localeCompare(right.id)),
        }),
        removePackage  : (state, action : PayloadAction<Package>) => ({
            packages : [
                ...state.packages,
            ].filter(pkg => pkg.id !== action.payload.id),
        }),
        removePackages : (state, action : PayloadAction<Package[]>) => ({
            packages : [
                ...state.packages,
            ].filter(pkg => !action.payload.some(p => p.id === pkg.id)),
        }),
        clearPackages  : () => initialState,
    },
});

export const { addPackage, addPackages, removePackage, removePackages, clearPackages, } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

import { createSlice, PayloadAction, } from '@reduxjs/toolkit';

import { SearchFilter, } from '../types';

type PrefState = {
    filters : string[],
};

const initialState : PrefState = {
    filters : Object.values(SearchFilter),
};

const prefSlice = createSlice({
    initialState,
    name     : 'pref',
    reducers : {
        addFilter : (state, action : PayloadAction<string>) => ({
            filters : [
                ...state.filters,
                action.payload,
            ],
        }),
        removeFilter : (state, action : PayloadAction<string>) => ({
            filters : [
                ...state.filters,
            ].filter(filter => filter !== action.payload),
        }),
    },
});

export const { addFilter, removeFilter, } = prefSlice.actions;

export const prefReducer = prefSlice.reducer;

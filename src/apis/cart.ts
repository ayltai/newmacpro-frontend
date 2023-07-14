import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { API_MAX_RETRIES, } from '../constants';
import type { Cart, } from '../types';

export const cartApi = createApi({
    reducerPath : 'cartApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_ENDPOINT!,
    }),
    tagTypes    : [
        'Cart',
    ],
    endpoints   : builder => ({
        getCart : builder.query<Cart, string>({
            query        : id => `/api/carts/${id}`,
            extraOptions : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        addCart : builder.mutation<void, Cart>({
            query           : cart => ({
                url             : '/api/carts',
                method          : 'POST',
                body            : cart,
                responseHandler : async response => await response.text(),
            }),
            invalidatesTags : [
                'Cart',
            ],
            extraOptions    : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
    }),
});

export const { useGetCartQuery, useAddCartMutation, } = cartApi;

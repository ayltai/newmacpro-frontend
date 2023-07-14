import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { API_MAX_RETRIES, } from '../constants';
import type { Package, Tweak, } from '../types';

export const tweakApi = createApi({
    reducerPath : 'tweakApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://raw.githubusercontent.com',
    }),
    endpoints   : builder => ({
        getTweaks   : builder.query<Package[], void>({
            query             : () => '/ayltai/ansible-macos-tweaks/master/tweaks.json',
            transformResponse : (response : Tweak[]) => (response || []).map(tweak => ({
                id          : `${tweak.id}`,
                displayName : tweak.name,
                description : tweak.description,
                provider    : tweak.author,
                value       : tweak.defaultValue,
                source      : 'Tweak',
            })),
            extraOptions      : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        getPlaybook : builder.query<string, void>({
            query        : () => '/ayltai/ansible-macos-tweaks/master/playbook.yml',
            extraOptions : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
    }),
});

export const { useGetPlaybookQuery, useGetTweaksQuery, } = tweakApi;

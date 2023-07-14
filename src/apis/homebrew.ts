import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { API_MAX_RETRIES, } from '../constants';
import type { HomebrewCaskPackage, HomebrewCorePackage, Package, } from '../types';

export const homebrewApi = createApi({
    reducerPath : 'homebrewApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://formulae.brew.sh',
    }),
    endpoints   : builder => ({
        cask : builder.query<Package[], void>({
            query             : () => '/api/cask.json',
            transformResponse : (response : HomebrewCaskPackage[]) => (response || []).map(result => ({
                id               : result.token,
                displayName      : result.name[0],
                description      : result.desc,
                version          : result.version,
                website          : result.homepage,
                monthlyDownloads : result.analytics?.install['30d'][result.token],
                source           : 'Homebrew/cask',
            })),
            extraOptions      : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        core : builder.query<Package[], void>({
            query             : () => '/api/formula.json',
            transformResponse : (response : HomebrewCorePackage[]) => (response || []).map(result => ({
                id               : result.name,
                displayName      : result.full_name ?? result.name,
                description      : result.desc,
                version          : result.versions.stable,
                license          : result.license,
                website          : result.homepage,
                monthlyDownloads : result.analytics?.install_on_request['30d'][result.name],
                source           : 'Homebrew/core',
            })),
            extraOptions      : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
    }),
});

export const { useCaskQuery, useCoreQuery, } = homebrewApi;

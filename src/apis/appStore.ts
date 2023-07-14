import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { API_MAX_RETRIES, } from '../constants';
import { AppStoreSearchResponse, Package, } from '../types';

export const appStoreApi = createApi({
    reducerPath : 'appStoreApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : 'https://search-itunes.vercel.app',
    }),
    endpoints   : builder => ({
        search : builder.query<Package[], string>({
            query             : keyword => `/?media=software&entity=macSoftware&limit=3&term=${keyword}`,
            transformResponse : (response : AppStoreSearchResponse) => (response?.results || []).map(result => ({
                id              : String(result.trackId),
                displayName     : String(result.trackName),
                description     : result.description,
                version         : result.version,
                logoUrls        : [
                    result.artworkUrl60,
                    result.artworkUrl100,
                    result.artworkUrl512,
                ].filter(url => url !== undefined) as string[],
                screenshotUrls  : result.screenshotUrls,
                provider        : result.sellerName ?? result.artistName,
                website         : result.trackViewUrl,
                userRating      : result.averageUserRatingForCurrentVersion,
                userRatingCount : result.userRatingCountForCurrentVersion,
                advisoryRating  : result.contentAdvisoryRating,
                price           : result.formattedPrice,
                source          : 'App Store',
            })),
            extraOptions      : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
    }),
});

export const { useSearchQuery, } = appStoreApi;

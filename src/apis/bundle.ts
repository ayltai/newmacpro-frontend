import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

import { API_MAX_RETRIES, } from '../constants';
import type { Bundle, Package, } from '../types';

export type BundleGetParams = {
    bundleId? : string,
    idToken?  : string,
};

export type BundleCreateParams = {
    bundle  : Bundle,
    idToken : string,
};

export type BundleUpdateParams = {
    bundle  : Bundle,
    idToken : string,
};

export type BundleDeleteParams = {
    bundleId : string,
    idToken  : string,
};

const transformPackages = (packages : any[]) : Package[] => packages.map(pkg => ({
    id               : pkg.id,
    displayName      : pkg.displayName,
    description      : pkg.description,
    version          : pkg.version,
    license          : pkg.license,
    logoUrls         : pkg.logoUrls?.split('|'),
    screenshotUrls   : pkg.screenshotUrls?.split('|'),
    provider         : pkg.provider,
    website          : pkg.website,
    monthlyDownloads : Number(pkg.monthlyDownloads),
    userRating       : Number(pkg.userRating),
    userRatingCount  : Number(pkg.userRatingCount),
    advisoryRating   : pkg.advisoryRating,
    price            : pkg.price,
    source           : pkg.source,
    value            : pkg.value,
}));

export const bundleApi = createApi({
    reducerPath : 'bundleApi',
    baseQuery   : fetchBaseQuery({
        baseUrl : process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_ENDPOINT!,
    }),
    endpoints   : builder => ({
        getBundle    : builder.query<Bundle, BundleGetParams>({
            query             : params => ({
                url     : `/api/bundles/${params.bundleId!}`,
                method  : 'GET',
                headers : params.idToken ? {
                    Authorization : `Bearer ${params.idToken}`,
                } : {},
            }),
            transformResponse : (response : Record<string, any>) => ({
                id          : response.id,
                displayName : response.displayName,
                description : response.description,
                iconId      : response.iconId,
                isPrivate   : Boolean(response.isPrivate),
                viewCount   : Number(response.viewCount),
                createdBy   : response.createdBy,
                createdAt   : response.createdAt,
                updatedAt   : response.updatedAt,
                packages    : transformPackages(response.packages),
            }),
            extraOptions      : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        getBundles   : builder.query<Bundle[], BundleGetParams>({
            query             : params => ({
                url     : '/api/bundles',
                method  : 'GET',
                headers : params.idToken ? {
                    Authorization : `Bearer ${params.idToken}`,
                } : {},
            }),
            transformResponse : (response : Record<string, any>[]) => response.map(record => ({
                id          : record.id,
                displayName : record.displayName,
                description : record.description,
                iconId      : record.iconId,
                isPrivate   : Boolean(record.isPrivate),
                viewCount   : Number(record.viewCount),
                createdBy   : record.createdBy,
                createdAt   : record.createdAt,
                updatedAt   : record.updatedAt,
                packages    : transformPackages(record.packages),
            })),
            extraOptions      : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        createBundle : builder.mutation<void, BundleCreateParams>({
            query           : params => ({
                url             : '/api/bundles',
                method          : 'POST',
                body            : params.bundle,
                headers         : {
                    Authorization : `Bearer ${params.idToken}`,
                },
                responseHandler : async response => await response.text(),
            }),
            extraOptions    : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        updateBundle : builder.mutation<void, BundleUpdateParams>({
            query           : params => ({
                url     : `/api/bundles/${params.bundle.id}`,
                method  : 'PUT',
                body    : params.bundle,
                headers : {
                    Authorization : `Bearer ${params.idToken}`,
                },
                responseHandler : async response => await response.text(),
            }),
            extraOptions    : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
        deleteBundle : builder.mutation<void, BundleDeleteParams>({
            query           : params => ({
                url             : `/api/bundles/${params.bundleId}`,
                method          : 'DELETE',
                headers         : {
                    Authorization : `Bearer ${params.idToken}`,
                },
                responseHandler : async response => await response.text(),
            }),
            extraOptions    : {
                maxRetries : API_MAX_RETRIES,
            },
        }),
    }),
});

export const { useCreateBundleMutation, useDeleteBundleMutation, useGetBundleQuery, useGetBundlesQuery, useUpdateBundleMutation, } = bundleApi;

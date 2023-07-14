import type { AppStorePackage, } from './AppStorePackage';

export type AppStoreSearchResponse = {
    resultCount : number,
    results     : AppStorePackage[],
};

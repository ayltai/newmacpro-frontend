export type AppStorePackage = {
    trackId                             : number,
    trackName                           : string,
    description?                        : string,
    version                             : string,
    sellerName?                         : string,
    artistName?                         : string,
    trackViewUrl?                       : string,
    averageUserRatingForCurrentVersion? : number,
    userRatingCountForCurrentVersion?   : number,
    contentAdvisoryRating?              : string,
    formattedPrice?                     : string,
    artworkUrl60?                       : string,
    artworkUrl100?                      : string,
    artworkUrl512?                      : string,
    screenshotUrls?                     : string[],
};
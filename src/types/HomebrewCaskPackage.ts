export type HomebrewCaskPackage = {
    token      : string,
    name       : string[],
    desc?      : string,
    version    : string,
    homepage?  : string,
    analytics? : {
        install : {
            '30d'  : Record<string, number>,
            '90d'  : Record<string, number>,
            '365d' : Record<string, number>,
        },
    },
};

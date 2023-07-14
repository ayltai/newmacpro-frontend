export type HomebrewCorePackage = {
    name       : string,
    full_name? : string,
    desc?      : string,
    versions   : {
        stable : string,
    },
    homepage?  : string,
    license?   : string,
    analytics? : {
        install_on_request : {
            '30d'  : Record<string, number>,
            '90d'  : Record<string, number>,
            '365d' : Record<string, number>,
        },
    },
};

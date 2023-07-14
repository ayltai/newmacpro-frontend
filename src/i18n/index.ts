import i18next from 'i18next';
import { initReactI18next, } from 'react-i18next';

import { handleError, } from '../utils';
import en from './en.json';

export const applyI18n = ({
    language,
    fallbackLanguage,
} : {
    language         : string,
    fallbackLanguage : string,
}) => i18next.use(initReactI18next).init({
    lng               : language,
    fallbackLng       : fallbackLanguage,
    nsSeparator       : false,
    keySeparator      : false,
    compatibilityJSON : 'v4',
    interpolation     : {
        escapeValue : false,
    },
    resources         : {
        en : {
            translation : en,
        },
    },
}).catch(handleError);

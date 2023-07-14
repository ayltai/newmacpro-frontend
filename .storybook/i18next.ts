import i18n from 'i18next';
import { initReactI18next, } from 'react-i18next';

import en from '../src/i18n/en.json';

i18n.use(initReactI18next).init({
    lng               : 'en',
    fallbackLng       : 'en',
    nsSeparator       : false,
    keySeparator      : false,
    compatibilityJSON : 'v3',
    interpolation     : {
        escapeValue : false,
    },
    react             : {
        useSuspense : false,
    },
    resources         : {
        en : {
            translation : en,
        },
    },
});

export default i18n;

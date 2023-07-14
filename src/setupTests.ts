import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('@sentry/react', () => ({
    init             : () => {},
    captureException : () => {},
}));

jest.mock('material-ui-confirm', ()=> ({
    ...jest.requireActual('material-ui-confirm'),
    useConfirm : () => jest.fn().mockImplementation(() => Promise.resolve(true)),
}));

jest.mock('mixpanel-browser', () => ({
    init  : () => {},
    track : () => {},
}));

jest.mock('react-i18next', () => ({
    useTranslation : () => ({
        t : (key : string, options : Record<string, any>) => {
            if (key === 'search.filters') return {
                '@apps'     : 'Include apps',
                '@packages' : 'Include packages',
                '@tweaks'   : 'Include tweaks',
                '@bundles'  : 'Include bundles',
            };

            if (key === 'bundle.create.default_display_name') return options.name;

            return key;
        },
    }),
}));

jest.mock('unique-names-generator', () => ({
    uniqueNamesGenerator : () => 'Dummy',
}));

jest.mock('uuid', () => ({
    v4 : () => '1',
}));

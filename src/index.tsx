import { Auth0Provider, } from '@auth0/auth0-react';
import '@fontsource/inter/200.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import * as Sentry from '@sentry/react';
import mixpanel from 'mixpanel-browser';
import React, { StrictMode, } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, } from 'react-redux';
import { PersistGate, } from 'redux-persist/integration/react';

import { App, } from './App';
import { applyI18n, } from './i18n';
import { persistor, store, } from './states';
import { handleError, } from './utils';
import './index.css';

if (process.env.REACT_APP_MIXPANEL_TOKEN) mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
    debug : process.env.NODE_ENV !== 'production',
});

if (process.env.REACT_APP_SENTRY_DSN) Sentry.init({
    dsn              : process.env.REACT_APP_SENTRY_DSN,
    environment      : process.env.NODE_ENV ?? 'development',
    release          : '1.0.0',
    tracesSampleRate : 1,
    integrations     : [
        new Sentry.BrowserTracing(),
    ],
});

applyI18n({
    language         : navigator.language.substring(0, 2),
    fallbackLanguage : 'en',
}).then(() => ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Sentry.ErrorBoundary showDialog>
            <Auth0Provider
                useRefreshTokens
                domain={process.env.REACT_APP_AUTH0_DOMAIN!}
                clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
                cacheLocation='localstorage'
                authorizationParams={{
                    redirect_uri : window.location.origin,
                    scope        : 'openid email profile',
                }}>
                <Provider store={store}>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </Auth0Provider>
        </Sentry.ErrorBoundary>
    </StrictMode>
)).catch(handleError);

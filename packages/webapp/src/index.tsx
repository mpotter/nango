import { SentryErrorBoundary } from './utils/sentry';

import { globalEnv } from './utils/env';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PostHogProvider } from 'posthog-js/react';
import { ErrorBoundary } from './components/ErrorBoundary';
import posthog from 'posthog-js';

if (globalEnv.publicPosthogKey) {
    posthog.init(globalEnv.publicPosthogKey, {
        api_host: globalEnv.publicPosthogHost,
        mask_personal_data_properties: true,
        session_recording: {
            maskAllInputs: true
        }
    });
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <SentryErrorBoundary fallback={<ErrorBoundary />}>
            <PostHogProvider client={posthog}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PostHogProvider>
        </SentryErrorBoundary>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

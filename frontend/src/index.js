import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import routes from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <GoogleOAuthProvider clientId="919944127183-jak4cqm6vlepij0qsoatlgg9dqorc4tl.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
    </I18nextProvider>
  </React.StrictMode>
);


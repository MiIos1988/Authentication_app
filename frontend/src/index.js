import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import routes from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import routes from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './i18n'

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


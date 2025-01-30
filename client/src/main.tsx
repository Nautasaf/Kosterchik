import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Registration} from '../components/Registration.tsx'
import { Provider } from 'react-redux';
import { store } from '../store/Index.ts'; 
import {Login} from '../components/Login.tsx'
import { HeadPage } from '../components/HeadPage.tsx';
// import { About } from '../components/About.tsx';
import {EventItem} from '../components/EventItem.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        index: true,
        element: <HeadPage />,
      },
      {
        path: '/event/:id',  
        element: <EventItem />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
)

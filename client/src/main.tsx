
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Registration} from '../components/Registration.tsx'
import { Provider } from 'react-redux';
import { store } from '../store/Index.ts';
import {Login} from '../components/Login.tsx'
import  ProfilePage  from '../components/profilePage/ProfilePage';


import React from 'react';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/Registration',
        element: <Registration />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ]

  },

]);


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
)

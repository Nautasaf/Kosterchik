import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Registration } from '../components/Registration.tsx'
import { Provider } from 'react-redux'
import { store } from '../store/Index.ts'
import { Login } from '../components/Login.tsx'
import ProfilePage from '../components/profilePage/ProfilePage'
import { HeadPage } from '../components/HeadPage.tsx'
import { EventItem } from '../components/EventItem.tsx'
import CreateEvent from '../components/createEvent/CreateEvent'

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
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/create-event',
        element: <CreateEvent />,
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
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

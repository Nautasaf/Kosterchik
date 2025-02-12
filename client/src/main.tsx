import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Registration } from "../components/Registration.tsx";
import { Provider } from "react-redux";
import { store } from "../store/Index.ts";
import { Login } from "../components/Login.tsx";
import ProfilePage from "../components/profilePage/ProfilePage";
import { HeadPage } from "../components/HeadPage.tsx";
import { EventItem } from "../components/EventItem.tsx";
import CreateEvent from "../components/createEvent/CreateEvent";
import { FavoritesPage } from "../components/FavoritesPage.tsx";
import { HistoryPage } from "../components/HistoryPage.tsx";
import EditEventPage from "../components/EditEventPage/EditEventPage";
import { CategoryPage } from "../components/CategoryPage.tsx";
import Project from "../components/Project/Project";
import Developers from "../components/Developers/Developers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/create-event",
        element: <CreateEvent />,
      },
      {
        index: true,
        element: <HeadPage />,
      },
      {
        path: "/event/:id",
        element: <EventItem />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/edit-event/:eventId",
        element: <EditEventPage />,
      },
      {
        path: "/eventType/:eventType",
        element: <CategoryPage />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/developers",
        element: <Developers />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

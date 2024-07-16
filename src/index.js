import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AddCard from "./components/AddCard";
import CreateCard from "./pages/CreateCard";
import CardAfterLesson from "./pages/CardAfterLesson";
import LearnRoom from "./pages/LearnRoom";

createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Layout />} />
    </Route>
  )
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-card",
        element: <AddCard />,
      },
      {
        path: "create-card",
        element: <CreateCard />,
      },
      {
        path: "learn-room/:lessonId",
        element: <LearnRoom />,
      },
      {
        path: "lesson/:lessonId",
        element: <CardAfterLesson />,
      },
    ],
  },

  {
    path: "*",
    element: <div>404</div>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

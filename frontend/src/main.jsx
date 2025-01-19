import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Error from "./pages/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/Contact";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "edit-profile",
        element: <EditProfile />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "verify-otp",
        element: <Otp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },

      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "create-profile",
        element: <CreateProfile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  />
);

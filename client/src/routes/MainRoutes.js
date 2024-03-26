import Layout from "../layout";

import React, { lazy } from "react";
import Loadable from "../ui-component/Loadable";

const Home = Loadable(lazy(() => import("../pages/home")));
const Login = Loadable(
  lazy(() => import("../pages/authentication/authentication/Login"))
);
const Register = Loadable(
  lazy(() => import("../pages/authentication/authentication/Register"))
);

const MainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ],
};

export default MainRoutes;

import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
      },
    ],
  },
]);

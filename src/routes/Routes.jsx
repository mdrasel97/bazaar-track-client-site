import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";

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
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
      },
    ],
  },
]);

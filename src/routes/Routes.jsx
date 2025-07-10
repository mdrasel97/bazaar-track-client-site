import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AuthLayout from "../layout/authLayout/AuthLayout";
import Error from "../components/error/Error";
import PrivateRoute from "./privateRoute/PrivateRoute";
import AddProduct from "../pages/dashboard/vendor/AddProduct";
import MyProducts from "../pages/dashboard/vendor/MyProducts";
import UpdateProduct from "../pages/dashboard/vendor/UpdateProduct";
import Products from "../pages/products/Products";
import productsLoader from "../router/loader/productsLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () => fetch("http://localhost:5000/products"),
      },
      {
        path: "/products",
        Component: Products,
        loader: productsLoader,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/addProducts",
        Component: AddProduct,
      },
      {
        path: "/dashboard/myProducts",
        Component: MyProducts,
      },
      {
        path: "/dashboard/updateProduct/:id",
        Component: UpdateProduct,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);

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
import AddAdvertisement from "../pages/dashboard/vendor/AddAdvertisement";
import MyAdvertisements from "../pages/dashboard/vendor/MyAdvertisements";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import AllProduct from "../pages/dashboard/admin/AllProduct";
import AllAdvertisement from "../pages/dashboard/admin/AllAdvertisement";
import ViewDetails from "../pages/viewDetails/ViewDetails";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import HelpCenter from "../pages/helpCenter/HelpCenter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () => fetch("http://localhost:5000/products/home"),
      },
      {
        path: "/products",
        Component: Products,
        loader: productsLoader,
      },
      {
        path: "/help",
        Component: HelpCenter,
      },
      {
        path: "/products/:id",
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <ShoppingCart></ShoppingCart>
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/products/${params.id}`),
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
      {
        path: "/dashboard/AddAdvertisement",
        Component: AddAdvertisement,
      },
      {
        path: "/dashboard/myAdvertisements",
        Component: MyAdvertisements,
      },
      // admin
      {
        path: "/dashboard/allUsers",
        Component: AllUsers,
      },
      {
        path: "/dashboard/allProducts",
        Component: AllProduct,
      },
      {
        path: "/dashboard/allAdvertisement",
        Component: AllAdvertisement,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);

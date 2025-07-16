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
import ManageWatchList from "../pages/dashboard/user/ManageWatchlist";
import Payment from "../pages/payment/Payment";
import MyOrderList from "../pages/dashboard/user/MyOrderList";
import AllOrders from "../pages/dashboard/admin/AllOrders";
import PriceTrendChart from "../pages/dashboard/user/PriceTrendChart";
import TrendViewer from "../pages/dashboard/user/TrendViewer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () =>
          fetch("https://bazaar-track-server.vercel.app/products/home"),
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
          fetch(`https://bazaar-track-server.vercel.app/products/${params.id}`),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <ShoppingCart></ShoppingCart>
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`https://bazaar-track-server.vercel.app/products/approved/${params.id}`),
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
      // user
      {
        path: "/dashboard/trends",
        Component: TrendViewer,
        loader: () =>
          fetch("https://bazaar-track-server.vercel.app/products/approved"),
      },

      {
        path: "/dashboard/myOrders",
        Component: MyOrderList,
      },
      {
        path: "/dashboard/watchList",
        Component: ManageWatchList,
      },
      // vendor route
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
          fetch(`https://bazaar-track-server.vercel.app/products/${params.id}`),
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
      {
        path: "/dashboard/allOrders",
        Component: AllOrders,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);

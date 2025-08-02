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
import Forbidden from "../components/forbidden/Forbidden";
import RoleProtectedRoute from "../pages/dashboard/protectedRoute/RoleProtectedRoute";
import Profile from "../pages/profile/Profile";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import Ai from "../components/ai/Ai";

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
        HydrateFallback: Error,
      },
      {
        path: "/ai",
        Component: Ai,
        // loader: () => fetch("https://bazaar-track-server.vercel.app/products/approved"),
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/help",
        Component: HelpCenter,
      },
      {
        path: "/profile",
        element: <Profile />,
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
        HydrateFallback: Error,
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
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      // USER ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["user"]} />,
        children: [
          {
            index: true,
            path: "/dashboard/trends",
            Component: TrendViewer,
            loader: () =>
              fetch(
                "https://bazaar-track-server.vercel.app/products/approved/trends"
              ),
            HydrateFallback: Error,
          },
          {
            path: "/dashboard/myOrders",
            Component: MyOrderList,
          },
          {
            path: "/dashboard/watchList",
            Component: ManageWatchList,
          },
        ],
      },

      // VENDOR ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["vendor"]} />,
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
              fetch(
                `https://bazaar-track-server.vercel.app/products/${params.id}`
              ),
            HydrateFallback: Error,
          },
          {
            path: "/dashboard/AddAdvertisement",
            Component: AddAdvertisement,
          },
          {
            path: "/dashboard/myAdvertisements",
            Component: MyAdvertisements,
          },
        ],
      },
      // ADMIN ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "/dashboard/allUsers",
            Component: AllUsers,
          },
          {
            path: "/dashboard/allProducts",
            Component: AllProduct,
          },
          {
            path: "/dashboard/adminProductUP/:id",
            Component: UpdateProduct,
            loader: ({ params }) =>
              fetch(
                `https://bazaar-track-server.vercel.app/products/${params.id}`
              ),
            HydrateFallback: Error,
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
    ],
  },

  {
    path: "*",
    Component: Error,
  },
  {
    path: "/forbidden",
    element: <Forbidden />,
  },
]);

// // hooks/useUserRole.js

// import useAuth from "./useAuth";

// const useUserRole = () => {
//   const { user } = useAuth();

//   // fallback role
//   const role = user?.role || "guest";

//   // role booleans for easy checking
//   const isUser = role === "user";
//   const isVendor = role === "vendor";
//   const isAdmin = role === "admin";

//   return { role, isUser, isVendor, isAdmin };
// };

// export default useUserRole;

// const { role } = useUserRole();

// let navItems = [];

// const userNavItems = [
//   {
//     label: "View Price Trends",
//     path: "/dashboard/trends",
//     icon: <BarChart2 className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "Manage Watchlist",
//     path: "/dashboard/watchlist",
//     icon: <Heart className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "My Orders",
//     path: "/dashboard/orders",
//     icon: <Package className="w-5 h-5 mr-2" />,
//   },
// ];

// const vendorNavItems = [
//   {
//     label: "Add Product",
//     path: "/dashboard/addProducts",
//     icon: <PlusSquare className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "My Products",
//     path: "/dashboard/myProducts",
//     icon: <Boxes className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "Add Advertisement",
//     path: "/dashboard/AddAdvertisement",
//     icon: <Megaphone className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "My Advertisements",
//     path: "/dashboard/myAdvertisement",
//     icon: <BadgeDollarSign className="w-5 h-5 mr-2" />,
//   },
// ];

// const adminNavItems = [
//   {
//     label: "All Users",
//     path: "/dashboard/allUsers",
//     icon: <Users className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "All Products",
//     path: "/dashboard/allProducts",
//     icon: <Layers className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "All Advertisements",
//     path: "/dashboard/allAdvertisement",
//     icon: <MonitorSpeaker className="w-5 h-5 mr-2" />,
//   },
//   {
//     label: "All Orders",
//     path: "/dashboard/allOrders",
//     icon: <ListOrdered className="w-5 h-5 mr-2" />,
//   },
// ];

// if (role === "user") {
//   navItems = userNavItems;
// } else if (role === "vendor") {
//   navItems = vendorNavItems;
// } else if (role === "admin") {
//   navItems = adminNavItems;
// }

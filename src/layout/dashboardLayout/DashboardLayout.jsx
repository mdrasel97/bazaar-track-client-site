import { Link, Outlet, useLocation } from "react-router";
import { useState } from "react";
import {
  Menu,
  BarChart2,
  Heart,
  Package,
  PlusSquare,
  Boxes,
  Megaphone,
  BadgeDollarSign,
  Users,
  Layers,
  MonitorSpeaker,
  ListOrdered,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import ProfileDropdown from "../../pages/profileDropdown/ProfileDropdown";
import useAuth from "../../hooks/useAuth";
import Logo from "../../components/logo/Logo";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../../components/loading/Loading";
import { toast } from "react-toastify";
// import { DialogTitle } from "@radix-ui/react-dialog";

const DashboardLayout = () => {
  const location = useLocation();
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useUserRole();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const navItems = [
  //   {
  //     label: "View Price Trends",
  //     path: "/dashboard/trends",
  //     icon: <BarChart2 className="w-5 h-5 mr-2" />,
  //   },
  //   {
  //     label: "Manage WatchList",
  //     path: "/dashboard/watchList",
  //     icon: <Heart className="w-5 h-5 mr-2" />,
  //   },
  //   {
  //     label: "My Orders",
  //     path: "/dashboard/myOrders",
  //     icon: <Package className="w-5 h-5 mr-2" />,
  //   },
  //   // vendor
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
  //     path: "/dashboard/addAdvertisement",
  //     icon: <Megaphone className="w-5 h-5 mr-2" />,
  //   },
  //   {
  //     label: "My Advertisements",
  //     path: "/dashboard/myAdvertisements",
  //     icon: <BadgeDollarSign className="w-5 h-5 mr-2" />,
  //   },
  //   // admin
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

  let navItems = [];

  const userNavItems = [
    {
      label: "View Price Trends",
      path: "/dashboard/trends",
      icon: <BarChart2 className="w-5 h-5 mr-2" />,
    },
    {
      label: "Manage Watchlist",
      path: "/dashboard/watchlist",
      icon: <Heart className="w-5 h-5 mr-2" />,
    },
    {
      label: "My Orders",
      path: "/dashboard/myOrders",
      icon: <Package className="w-5 h-5 mr-2" />,
    },
  ];

  const vendorNavItems = [
    {
      label: "Add Product",
      path: "/dashboard/addProducts",
      icon: <PlusSquare className="w-5 h-5 mr-2" />,
    },
    {
      label: "My Products",
      path: "/dashboard/myProducts",
      icon: <Boxes className="w-5 h-5 mr-2" />,
    },
    {
      label: "Add Advertisement",
      path: "/dashboard/AddAdvertisement",
      icon: <Megaphone className="w-5 h-5 mr-2" />,
    },
    {
      label: "My Advertisements",
      path: "/dashboard/myAdvertisements",
      icon: <BadgeDollarSign className="w-5 h-5 mr-2" />,
    },
  ];

  const adminNavItems = [
    {
      label: "All Users",
      path: "/dashboard/allUsers",
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      label: "All Products",
      path: "/dashboard/allProducts",
      icon: <Layers className="w-5 h-5 mr-2" />,
    },
    {
      label: "All Advertisements",
      path: "/dashboard/allAdvertisement",
      icon: <MonitorSpeaker className="w-5 h-5 mr-2" />,
    },
    {
      label: "All Orders",
      path: "/dashboard/allOrders",
      icon: <ListOrdered className="w-5 h-5 mr-2" />,
    },
  ];

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "user") {
    navItems = userNavItems;
  } else if (role === "vendor") {
    navItems = vendorNavItems;
  } else if (role === "admin") {
    navItems = adminNavItems;
  }

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("sign Out successful");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <div className="min-h-screen   md:flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Mobile menu toggle */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetTitle className="text-xl font-bold text-blue-600 p-4">
                Dashboard
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation panel for managing dashboard sections.
              </SheetDescription>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-2 rounded-md transition ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : ""
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="text-xl font-bold">
            {/* BazaarTrack Dashboard */}
            <Logo />
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.photoURL} alt="User" />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 border-r shadow-sm">
          <div className="p-6 font-bold text-xl text-blue-600">Dashboard </div>
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition ${
                  location.pathname === item.path
                    ? " text-blue-600 font-medium"
                    : " hover:bg-blue-300 "
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-black min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className=" border-t text-center text-sm py-3">
        © {new Date().getFullYear()} BazaarTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;

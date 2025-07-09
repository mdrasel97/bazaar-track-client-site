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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProfileDropdown from "../../pages/profileDropdown/ProfileDropdown";

const DashboardLayout = () => {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
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
      path: "/dashboard/orders",
      icon: <Package className="w-5 h-5 mr-2" />,
    },
    // vendor
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
      path: "/dashboard/myAdvertisement",
      icon: <BadgeDollarSign className="w-5 h-5 mr-2" />,
    },
    // admin
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

  return (
    <div className="min-h-screen dark:bg-black  flex flex-col">
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
              <div className="p-4 font-bold text-xl text-blue-600">
                BazaarTrack
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-2 rounded-md transition ${
                      location.pathname === item.path
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="text-xl font-bold text-blue-600 hidden md:block">
            BazaarTrack Dashboard
          </div>

          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 border-r shadow-sm">
          <div className="p-6 font-bold text-xl text-blue-600">BazaarTrack</div>
          <nav className="px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-black">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t text-center text-sm text-gray-500 py-3">
        © {new Date().getFullYear()} BazaarTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;

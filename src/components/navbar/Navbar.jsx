import { useContext, useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import Logo from "../logo/Logo";
import { ModeToggle } from "../ui/mode-toggle";
import useAuth from "../../hooks/useAuth";
import ProfileDropdown from "../../pages/profileDropdown/ProfileDropdown";
import { CartContext } from "../../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { totalItems } = useContext(CartContext);
  // const { email, name } = useContext(AuthContext);
  // console.log(email, name);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Navigate or filter logic here
  };

  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  //   setTotalItems(total);
  // }, []);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  //     setTotalItems(total);
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);
  return (
    <header className=" shadow-sm border-b sticky bg-accent top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Logo />

          {/* Search Bar (Desktop only) */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-md mx-4 hidden md:block"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/products" className=" transition-colors">
              Products
            </Link>
            <ModeToggle />
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-[20px] h-5 rounded-full text-xs flex items-center justify-center">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {user ? (
              // Show profile dropdown if logged in
              <ProfileDropdown />
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          {/* Right side: ModeToggle + Hamburger (always visible) */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 pb-4 border-t pt-4 md:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </form>
            <div className="flex flex-col space-y-2">
              <Link to="/products" className=" transition-colors py-2">
                Products
              </Link>
              <Link to="/cart" className="flex items-center space-x-2 py-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Cart ({totalItems})</span>
              </Link>
              {/* <Link to="/login" className="flex items-center space-x-2 py-2">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link> */}
              {user ? (
                // Show profile dropdown if logged in
                <ProfileDropdown />
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

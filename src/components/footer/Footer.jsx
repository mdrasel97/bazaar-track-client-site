import { Link } from "react-router";
import Logo from "../logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          {/* <Link to="/" className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BT</span>
            </div>
            <span className="text-xl font-bold text-white">Bazaar Track</span>
          </Link> */}
          <Logo />
          <p className="text-sm">
            Your trusted marketplace for quality products and exceptional
            service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="" className="hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Shipping Info
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="" className="hover:underline">
                Newsletter
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Social Media
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bazaar Track. All rights reserved.
      </div>
    </footer>
  );
}

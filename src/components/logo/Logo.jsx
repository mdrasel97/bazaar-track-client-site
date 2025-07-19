import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">BT</span>
        </div>
        <span className="text-2xl font-bold sm:block">Bazaar Track</span>
      </Link>
    </div>
  );
};

export default Logo;

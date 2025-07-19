import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <AlertTriangle className="w-16 h-16 text-red-600 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        🔙 Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;

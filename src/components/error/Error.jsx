import { Link } from "react-router";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
// import errorAnimation from "@/assets/lottie/error-404.json"; // Make sure this path is correct

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Lottie
          //   animationData={errorAnimation}
          loop
          className="w-full max-w-sm mx-auto"
        />

        <h2 className="text-3xl font-bold mt-6 text-gray-800">
          Oops! Page not found.
        </h2>
        <p className="text-gray-600 mt-2 mb-6">
          The page you are looking for might have been removed or does not
          exist.
        </p>

        <Link to="/">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:opacity-90 transition">
            ⬅️ Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;

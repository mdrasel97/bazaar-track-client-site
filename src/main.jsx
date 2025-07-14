import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);

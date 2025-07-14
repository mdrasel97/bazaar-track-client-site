import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/loading/Loading";
import { Navigate } from "react-router";

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();
  if (loading || isLoading) {
    return <Loading />;
  }
  if (!user || role !== "vendor") {
    return (
      <Navigate
        state={{ from: location.pathname }}
        to={"/forbidden"}
      ></Navigate>
    );
  }
  return children;
};

export default VendorRoute;

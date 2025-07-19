import { Navigate, Outlet } from "react-router";
import useUserRole from "@/hooks/useUserRole";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" replace />
  );
};

export default RoleProtectedRoute;

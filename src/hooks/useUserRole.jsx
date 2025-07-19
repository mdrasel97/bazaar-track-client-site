import { useEffect, useState } from "react";
import useAuth from "./useAuth"; // your existing auth context
import useAxiosSecure from "./useAxiosSecure";
import Loading from "../components/loading/Loading";

const useUserRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("guest");
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user?.email || loading) {
      return <Loading />;
    }

    const fetchUserRole = async () => {
      try {
        const res = await axiosSecure.get(`/users/role?email=${user.email}`);
        setRole(res.data.role || "guest");
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        setRole("guest");
      } finally {
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email, loading, axiosSecure]);

  const isUser = role === "user";
  const isVendor = role === "vendor";
  const isAdmin = role === "admin";

  return { role, isUser, isVendor, isAdmin, roleLoading };
};

export default useUserRole;

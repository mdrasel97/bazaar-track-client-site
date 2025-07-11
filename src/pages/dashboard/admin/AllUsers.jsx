import React, { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-blue-500 font-medium">Loading users...</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No users found</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">👥 All Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Role</th>
              <th className="py-3 px-4 border-b">Provider</th>
              <th className="py-3 px-4 border-b">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{user.name || "N/A"}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4">{user.provider || "Unknown"}</td>
                <td className="py-3 px-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

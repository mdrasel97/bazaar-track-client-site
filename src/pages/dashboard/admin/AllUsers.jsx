import React, { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchEmail) return;
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/users/search?email=${searchEmail}`);

      // setSearchedUser(res.data);
      if (res.data.length > 0) {
        setSearchedUser(res.data[0]); // just pick first match
        console.log("✅ Found User:", res.data[0]);
      } else {
        setSearchedUser(null);
        toast.info("User not found.");
      }
    } catch (err) {
      toast.error("Failed to search user.", err);
      setSearchedUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/role`, { role });
      if (res.data.modifiedCount > 0) {
        toast.success(`✅ User promoted to ${role}`);
        setSearchedUser({ ...searchedUser, role }); // update UI
      } else {
        toast.error("❌ Failed to update role");
      }
    } catch (err) {
      toast.error("❌ Something went wrong", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">👥 Search User by Email</h2>

      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter email to search..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading || !searchEmail}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Search"}
        </Button>
      </div>

      {searchedUser && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Role</th>
                <th className="py-3 px-4 border-b">Provider</th>
                <th className="py-3 px-4 border-b">Joined</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{searchedUser.name || "N/A"}</td>
                <td className="py-3 px-4">{searchedUser.email}</td>
                <td className="py-3 px-4 capitalize">{searchedUser.role}</td>
                <td className="py-3 px-4">
                  {searchedUser.provider || "Unknown"}
                </td>
                <td className="py-3 px-4">
                  {new Date(searchedUser.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 space-x-2">
                  {searchedUser.role !== "admin" ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      onClick={() =>
                        handleRoleChange(searchedUser._id, "admin")
                      }
                    >
                      Make Admin
                    </Button>
                  ) : (
                    <button
                      className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                      disabled
                    >
                      Admin
                    </button>
                  )}
                  {searchedUser.role !== "vendor" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-gradient-to-r from-green-500 to-teal-500 text-white"
                      onClick={() =>
                        handleRoleChange(searchedUser._id, "vendor")
                      }
                    >
                      Make Vendor
                    </Button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;

import React, { useState } from "react";

import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  // const [searchEmail, setSearchEmail] = useState("");
  // const [searchName, setSearchName] = useState("");
  // const [searchedUser, setSearchedUser] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!searchTerm) {
      toast.info("Please enter email or name to search.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/users/search?email=${searchTerm}&name=${searchTerm}`
      );

      if (res.data.length > 0) {
        setSearchedUsers(res.data); // ✅ set all matching users
        // console.log("✅ Found Users:", res.data);
      } else {
        setSearchedUsers([]); // ✅ empty list
        toast.info("User not found.");
      }
    } catch (err) {
      toast.error("Failed to search user.");
      console.error(err);
      setSearchedUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/role`, { role });

      if (res.data.modifiedCount > 0) {
        toast.success(`✅ Role updated to ${role}`);
        const updatedUser = {
          ...searchedUsers.find((u) => u._id === userId),
          role,
        };

        setSearchedUsers((prev) =>
          prev.map((user) => (user._id === userId ? updatedUser : user))
        );
      } else {
        toast.error("❌ Update failed");
      }
    } catch (err) {
      toast.error("❌ Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <title>Bazaar Track || All User</title>
      <h2 className="text-2xl font-bold mb-6">👥 Search User by Email</h2>

      {/* <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter email to search..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading || !searchEmail}>
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Search"}
        </Button>
      </div> */}

      <ScrollArea className="rounded-md border w-96 md:w-full whitespace-nowrap">
        <div className="flex md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by email or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
          <Button
            onClick={handleSearch}
            // disabled={loading || !searchTerm}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Search"}
          </Button>
        </div>
        {searchedUsers && (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded shadow-sm">
              <thead className=" text-left">
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
                {searchedUsers.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-3 px-4">{user.name || "N/A"}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 capitalize">{user.role}</td>
                    <td className="py-3 px-4">{user.provider || "Unknown"}</td>
                    <td className="py-3 px-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      {user.role !== "admin" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                          onClick={() => handleRoleChange(user._id, "admin")}
                        >
                          Make Admin
                        </Button>
                      ) : (
                        <button className="py-1 rounded" disabled>
                          Admin
                        </button>
                      )}
                      {user.role !== "vendor" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-gradient-to-r from-green-500 to-teal-500 text-white"
                          onClick={() => handleRoleChange(user._id, "vendor")}
                        >
                          Make Vendor
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default AllUsers;

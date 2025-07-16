import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Link } from "react-router";
// import { DialogContent } from "@/components/ui/dialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ManageWatchList = () => {
  const axiosSecure = useAxiosSecure();
  const [watchList, setWatchList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWatchList = async () => {
      if (!user?.email) return; // user না থাকলে কিছুই করো না
      try {
        const res = await axiosSecure.get(`/watchList?email=${user?.email}`);
        setWatchList(res.data);
      } catch (err) {
        toast.error(" Failed to load watchList", err);
      }
    };
    fetchWatchList();
  }, [axiosSecure, user]);

  const handleRemove = async (id) => {
    try {
      const res = await axiosSecure.delete(`/watchList/${id}`);
      if (res.data.deletedCount > 0) {
        setWatchList((prev) => prev.filter((item) => item._id !== id));
        toast.success("✅ Removed from watchList");
      } else {
        toast.error("❌ Failed to remove");
      }
    } catch (err) {
      toast.error("❌ Error removing item", err);
    }
  };

  if (!watchList.length) {
    return <div className="text-center py-10">No items in watchList</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🔖 Manage WatchList</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full  border rounded shadow-sm">
          <thead className="text-left">
            <tr>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Market</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchList.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-3 px-4">{item.itemName}</td>
                <td className="py-3 px-4">{item.marketName}</td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4 space-x-2">
                  <Link to="/products">
                    <Button size="sm" variant="outline">
                      ➕ Add More
                    </Button>
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-500"
                        onClick={() => setSelectedItem(item)}
                      >
                        Remove
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="text-center">
                      {selectedItem && (
                        <>
                          <p className="text-lg font-semibold mb-4">
                            Are you sure you want to remove <br />
                            <span className="text-red-600">
                              {selectedItem.itemName}
                            </span>{" "}
                            from your watchlist?
                          </p>
                          <div className="flex justify-center gap-4">
                            <Button
                              variant="outline"
                              onClick={() => setSelectedItem(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              // className="bg-red-500"
                              onClick={() => handleRemove(selectedItem._id)}
                            >
                              Confirm Remove
                            </Button>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWatchList;

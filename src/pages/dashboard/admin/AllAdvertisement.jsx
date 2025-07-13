import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";

const AllAdvertisement = () => {
  const [ads, setAds] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Load all ads
  useEffect(() => {
    axiosSecure.get("/admin/advertisements").then((res) => {
      setAds(res.data);
    });
  }, [axiosSecure]);

  // 🔄 Change ad status
  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/admin/advertisements/${id}`, {
        status,
      });

      if (res.data.modifiedCount > 0) {
        toast.success(`Advertisement ${status}`);
        setAds((prev) =>
          prev.map((ad) => (ad._id === id ? { ...ad, status } : ad))
        );
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // ❌ Delete ad
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the ad.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/advertisements/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Ad deleted");
          setAds(ads.filter((a) => a._id !== id));
        }
      } catch (err) {
        toast.error("Failed to delete ad");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📢 All Advertisements</h2>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Banner</th>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Vendor</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-t">
                <td className="p-3">
                  <img
                    src={ad.image}
                    alt={ad.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>
                <td className="p-3">{ad.title}</td>
                <td className="p-3 line-clamp-2">
                  {new Date(ad.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">{ad.vendorEmail}</td>
                <td className="p-3 capitalize">{ad.status}</td>
                <td className="p-3 text-right space-x-2">
                  {ad.status !== "approved" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(ad._id, "approved")}
                    >
                      Approve
                    </Button>
                  )}
                  {ad.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(ad._id, "rejected")}
                    >
                      Reject
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(ad._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAdvertisement;

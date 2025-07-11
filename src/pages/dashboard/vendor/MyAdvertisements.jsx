import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const MyAdvertisements = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAd, setEditingAd] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axiosSecure.get(
          `/advertisements?vendorEmail=${user?.email}`
        );
        setAds(res.data);
      } catch (error) {
        toast.error("Failed to fetch advertisements", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchAds();
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this advertisement!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/advertisements/${id}`);
        setAds((prev) => prev.filter((ad) => ad._id !== id));
        toast.success("Advertisement deleted");
      } catch (err) {
        toast.error("Delete failed", err);
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.value;

    try {
      const res = await axiosSecure.patch(`/advertisements/${editingAd._id}`, {
        title,
        description,
        image,
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Advertisement updated");
        setAds((prev) =>
          prev.map((ad) =>
            ad._id === editingAd._id ? { ...ad, title, description, image } : ad
          )
        );
        setEditingAd(null);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (ads.length === 0)
    return <div className="text-center py-10">No advertisements found</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">📢 My Advertisements</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Ad Title</th>
              <th className="p-3">Short Description</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-t">
                <td className="p-3">{ad.title}</td>
                <td className="p-3 line-clamp-1">{ad.description}</td>
                <td className="p-3 capitalize">{ad.status}</td>
                <td className="p-3 flex gap-2">
                  <Button size="sm" onClick={() => setEditingAd(ad)}>
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
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

      {/* Update Modal */}
      {editingAd && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg relative">
            <h3 className="text-xl font-semibold mb-4 text-center">
              ✏️ Update Advertisement
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input name="title" defaultValue={editingAd.title} required />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  name="description"
                  defaultValue={editingAd.description}
                  required
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input name="image" defaultValue={editingAd.image} required />
              </div>

              <div className="flex justify-between gap-4">
                <div>
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setEditingAd(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAdvertisements;

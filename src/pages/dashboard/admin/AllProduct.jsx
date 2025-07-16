import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { Check, Pencil, Trash, X } from "lucide-react";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("📦 Page changed to:", page); // add this
    setLoading(true);
    axiosSecure
      .get(`/products?page=${page}&limit=${limit}`)
      .then((res) => {
        console.log("✅ Product list:", res.data.products); // add this
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [axiosSecure, page, limit]);

  // Inside return
  // {
  //   loading ? <p>Loading...</p> : <table>...</table>;
  // }

  // useEffect(() => {
  //   axiosSecure.get("/products").then((res) => {
  //     setProducts(res.data);
  //   });
  // }, [axiosSecure]);

  // useEffect(() => {
  //   axiosSecure
  //     .get(`/products?page=${page}&limit=${limit}`)
  //     .then((res) => {
  //       setProducts(res.data.products);
  //       setTotalPages(res.data.totalPages);
  //     })
  //     .catch((err) => console.error("Failed to load products:", err));
  // }, [axiosSecure, page, limit]);

  // ✅ Approve product
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/products/${id}/approve`);
      if (res.data.modifiedCount > 0) {
        toast.success("Product approved");
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p))
        );
      }
    } catch (err) {
      toast.error("Failed to approve product", err);
    }
  };

  // ❌ Reject product
  const handleReject = async (id) => {
    const { value: feedback } = await Swal.fire({
      title: "Reject Product",
      input: "textarea",
      inputLabel: "Rejection Reason",
      inputPlaceholder: "Write feedback...",
      inputAttributes: {
        "aria-label": "Feedback",
      },
      showCancelButton: true,
    });

    if (feedback) {
      try {
        const res = await axiosSecure.patch(`/admin/products/${id}/reject`, {
          feedback,
        });
        if (res.data.modifiedCount > 0) {
          toast.success("Product rejected");
          setProducts((prev) =>
            prev.map((p) =>
              p._id === id ? { ...p, status: "rejected", feedback } : p
            )
          );
        }
      } catch (err) {
        toast.error("Failed to reject product", err);
      }
    }
  };

  // ✏️ Update product
  const handleUpdate = (id) => {
    navigate(`/dashboard/updateProduct/${id}`);
  };

  // 🗑️ Delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/products/${id}`);
        toast.success("Product deleted");
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        toast.error("Failed to delete product", error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🧾 All Products</h2>
      <div className="overflow-x-auto rounded-md border">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3">Market</th>
                <th className="p-3">Vendor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.itemName}</td>
                  <td className="p-3">{p.marketName}</td>
                  <td className="p-3">{p.vendorEmail}</td>
                  <td className="p-3">{p.date}</td>
                  <td className="p-3">৳{p.pricePerUnit}</td>
                  <td className="p-3 capitalize">
                    {p.status}
                    {p.status === "rejected" && p.feedback && (
                      <div className="text-xs text-red-600 italic">
                        Reason: {p.feedback}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex flex-wrap justify-end items-center gap-2">
                      {p.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(p._id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(p._id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdate(p._id)}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(p._id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* add pagination  */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          ⬅️ Previous
        </button>

        <span className="text-sm">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default AllProduct;

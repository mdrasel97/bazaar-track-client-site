import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/loading/Loading";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vendor's products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosSecure.get(`/my-products/${user?.email}`);
        setProducts(res.data); // ✅ axios automatically parses JSON
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user, axiosSecure]);

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
        const res = await axiosSecure.delete(`/products/${id}`);

        if (res.status === 200) {
          setProducts(products.filter((product) => product._id !== id));
          toast.success("Product deleted successfully");
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">My Submitted Products</h2>
      {products.length === 0 ? (
        <p className="">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm md:text-base">
            <thead className=" text-left">
              <tr>
                <th className="px-4 py-3">Item Name</th>
                <th className="px-4 py-3">Price/Unit</th>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-2">{p.itemName}</td>
                  <td className="px-4 py-2">Taka {p.pricePerUnit}</td>
                  <td className="px-4 py-2">{p.marketName}</td>
                  <td className="px-4 py-2">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        p.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : p.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2 justify-center">
                    <Link to={`/dashboard/updateProduct/${p._id}`}>
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;

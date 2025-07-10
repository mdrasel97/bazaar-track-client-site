import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (error) {
        toast.error("❌ Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        <span className="ml-2 text-blue-600 font-semibold">Loading...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No products found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">📦 All Products</h2>

      <div className="overflow-x-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Market</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.productImage}
                    alt={product.itemName}
                    className="w-14 h-14 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{product.itemName}</TableCell>
                <TableCell>{product.marketName}</TableCell>
                <TableCell>৳{product.pricePerUnit}</TableCell>
                <TableCell>{product.date}</TableCell>
                <TableCell>
                  <span
                    className={`capitalize px-2 py-1 rounded text-sm ${
                      product.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : product.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                {/* 
                <TableCell>
                  <Button size="sm" variant="outline">Update</Button>
                  <Button size="sm" variant="destructive" className="ml-2">Delete</Button>
                </TableCell>
                */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;

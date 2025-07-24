import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/loading/Loading";

const Products = () => {
  const axiosInstant = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Parse query params
  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "";
  const initialOrder = queryParams.get("order") || "";
  const initialDate = queryParams.get("date") || null;
  const page = parseInt(queryParams.get("page")) || 1;

  const [sort, setSort] = useState(
    initialSort && initialOrder ? `${initialSort}-${initialOrder}` : ""
  );
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? new Date(initialDate) : null
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch approved products with pagination, sort, and date filter
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (sort) {
          const [key, order] = sort.split("-");
          params.set("sort", key);
          params.set("order", order);
        }

        if (selectedDate) {
          params.set("date", selectedDate.toISOString().split("T")[0]);
        }

        params.set("page", page); // 👈 Pagination

        const res = await axiosInstant.get(
          `/products/approved?${params.toString()}`
        );

        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);

        // Update URL
        navigate(`/products?${params.toString()}`, { replace: true });
      } catch (err) {
        console.error("❌ Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sort, selectedDate, page, navigate, axiosInstant]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <title>Bazaar Track || Products</title>
      <h2 className="text-2xl font-bold mb-6">📦 All Products</h2>

      {/* 🔍 Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border border-blue-500 p-4 rounded-md shadow mb-6">
        {/* 📅 Date Picker */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="📅 Filter by date"
          className="border px-3 py-2 rounded-md"
          dateFormat="yyyy-MM-dd"
        />

        {/* 🔽 Sort Dropdown */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pricePerUnit-asc">Price: Low to High</SelectItem>
            <SelectItem value="pricePerUnit-desc">
              Price: High to Low
            </SelectItem>
            <SelectItem value="createdAt-desc">Latest First</SelectItem>
            <SelectItem value="createdAt-asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        {/* ♻️ Reset Button */}
        <Button
          variant="outline"
          onClick={() => {
            setSort("");
            setSelectedDate(null);
            navigate("/products");
          }}
        >
          Reset
        </Button>
      </div>

      {/* 📦 Product Grid */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* 🔢 Pagination */}
      <div className="flex gap-2 justify-center mt-6 flex-wrap">
        {/* Prev */}
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => {
            const params = new URLSearchParams(location.search);
            if (sort) {
              const [sKey, sOrder] = sort.split("-");
              params.set("sort", sKey);
              params.set("order", sOrder);
            }
            if (selectedDate) {
              params.set("date", selectedDate.toISOString().split("T")[0]);
            }
            params.set("page", page - 1);
            navigate(`/products?${params.toString()}`);
          }}
        >
          ⬅️ Prev
        </Button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            variant={page === index + 1 ? "default" : "outline"}
            onClick={() => {
              const params = new URLSearchParams(location.search);
              if (sort) {
                const [sKey, sOrder] = sort.split("-");
                params.set("sort", sKey);
                params.set("order", sOrder);
              }
              if (selectedDate) {
                params.set("date", selectedDate.toISOString().split("T")[0]);
              }
              params.set("page", index + 1);
              navigate(`/products?${params.toString()}`);
            }}
          >
            {index + 1}
          </Button>
        ))}

        {/* Next */}
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => {
            const params = new URLSearchParams(location.search);
            if (sort) {
              const [sKey, sOrder] = sort.split("-");
              params.set("sort", sKey);
              params.set("order", sOrder);
            }
            if (selectedDate) {
              params.set("date", selectedDate.toISOString().split("T")[0]);
            }
            params.set("page", page + 1);
            navigate(`/products?${params.toString()}`);
          }}
        >
          Next ➡️
        </Button>
      </div>
    </div>
  );
};

export default Products;

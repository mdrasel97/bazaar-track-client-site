import { useNavigate, useLocation, useLoaderData } from "react-router";
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

const Products = () => {
  const products = useLoaderData();
  console.log(products);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialSort = queryParams.get("sort") || "";
  const initialDate = queryParams.get("date") || null;

  const [sort, setSort] = useState(initialSort);
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? new Date(initialDate) : null
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (selectedDate)
      params.set("date", selectedDate.toISOString().split("T")[0]);

    // navigate(`/products?${params.toString()}`);
  }, [sort, selectedDate, navigate]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">📦 All Products</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border border-blue-500 p-4 rounded-md shadow mb-6">
        {/* Date Picker */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="📅 Filter by date"
          className="border px-3 py-2 rounded-md"
          dateFormat="yyyy-MM-dd"
        />

        {/* Sort Dropdown */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="date-latest">Latest First</SelectItem>
            <SelectItem value="date-oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
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

      {/* Product List */}
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
    </div>
  );
};

export default Products;

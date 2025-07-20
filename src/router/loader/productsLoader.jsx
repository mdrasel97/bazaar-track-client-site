// routes/loaders/productsLoader.js
import axios from "axios"; // ✅ Regular axios

const productsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort");
  const order = url.searchParams.get("order");
  const date = url.searchParams.get("date");

  let query = `${import.meta.env.VITE_API_BASE}/products/approved`;
  const params = new URLSearchParams();

  if (sort) params.append("sort", sort);
  if (order) params.append("order", order);
  if (date) params.append("date", date);

  if (params.toString()) {
    query += `?${params.toString()}`;
  }

  try {
    const res = await axios.get(query);
    return res.data;
  } catch (err) {
    console.error("❌ productsLoader failed:", err.message);
    return [];
  }
};

export default productsLoader;

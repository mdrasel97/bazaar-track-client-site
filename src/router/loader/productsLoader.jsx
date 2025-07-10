// routes/loaders/productsLoader.js
import axios from "axios";

const productsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort");
  const date = url.searchParams.get("date");

  let query = `${import.meta.env.VITE_API_BASE}/products`;
  const params = new URLSearchParams();

  if (sort) params.append("sort", sort);
  if (date) params.append("date", date);

  if (params.toString()) {
    query += `?${params.toString()}`;
  }

  const res = await axios.get(query);
  return res.data;
};

export default productsLoader;

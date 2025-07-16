import { useLoaderData } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { useState } from "react";

const TrendViewer = () => {
  const products = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const sortedPrices = [...selectedProduct.prices].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const calculateTrend = () => {
    const len = sortedPrices.length;
    if (len < 2) return null;
    const oldPrice = sortedPrices[len - 2].price;
    const newPrice = sortedPrices[len - 1].price;
    const change = (((newPrice - oldPrice) / oldPrice) * 100).toFixed(1);
    const isPositive = change >= 0;
    return { change, isPositive };
  };

  const trend = calculateTrend();

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 border p-4 rounded shadow">
        <h3 className="font-semibold text-lg mb-3">Tracked Items</h3>
        <ul className="space-y-2">
          {products.map((p) => (
            <li
              key={p._id}
              className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
                selectedProduct._id === p._id ? "bg-gray-200 font-bold" : ""
              }`}
              onClick={() => setSelectedProduct(p)}
            >
              <img
                src={p.productImage}
                alt={p.itemName}
                className="w-5 h-5 rounded-full object-cover"
              />
              {p.itemName}
            </li>
          ))}
        </ul>
      </aside>

      {/* Chart and Info */}
      <main className="flex-1 border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-2">📈 Price Trends</h2>

        <div className="mb-3">
          <p className="text-lg font-semibold">🥕 {selectedProduct.itemName}</p>
          <p className="text-sm text-gray-600">{selectedProduct.marketName}</p>
          <p className="text-sm text-gray-600">
            Vendor: {selectedProduct.vendorName}
          </p>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedPrices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(parseISO(date), "MMM d")}
              />
              <YAxis unit="৳" />
              <Tooltip
                labelFormatter={(date) =>
                  `Date: ${format(parseISO(date), "PPP")}`
                }
                formatter={(value) => [`৳${value}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#007bff"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {trend && (
          <p className="mt-3 text-sm font-medium">
            Trend:{" "}
            <span
              className={trend.isPositive ? "text-green-600" : "text-red-600"}
            >
              {trend.isPositive ? "+" : ""}
              {trend.change}% last 7 days
            </span>
          </p>
        )}
      </main>
    </div>
  );
};

export default TrendViewer;

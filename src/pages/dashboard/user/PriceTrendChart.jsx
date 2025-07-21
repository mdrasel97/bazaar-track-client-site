import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router";

const PriceTrendChart = () => {
  const product = useLoaderData();
  // console.log(product);

  // Destructure needed fields
  const { itemName, marketName, vendorName, prices = [] } = product;

  // Sorted by date
  const sortedPrices = [...prices].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Trend calculation
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
    <div className="p-4 border rounded shadow bg-white max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-2">📈 Price Trends</h2>

      <div className="mb-3">
        <p className="text-lg font-semibold">🥕 {itemName}</p>
        <p className="text-sm text-gray-600">{marketName}</p>
        <p className="text-sm text-gray-600">Vendor: {vendorName}</p>
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
        <p className={`mt-3 text-sm font-medium`}>
          Trend:{" "}
          <span
            className={trend.isPositive ? "text-green-600" : "text-red-600"}
          >
            {trend.isPositive ? "+" : ""}
            {trend.change}% last 7 days
          </span>
        </p>
      )}
    </div>
  );
};

export default PriceTrendChart;

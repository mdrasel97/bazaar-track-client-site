import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ShoppingCart, Eye, TrendingUp } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const COLORS = ["#FF8042", "#00C49F", "#0088FE"]; // customize as needed

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    orders: 0,
    watchlist: 0,
    trends: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserStats = async () => {
      try {
        const [ordersRes, watchRes] = await Promise.all([
          axiosSecure.get(`/my-orders?email=${user?.email}`),
          axiosSecure.get(`/watchList?email=${user?.email}`),
        ]);

        setStats({
          orders: ordersRes.data.length || 0,
          watchlist: watchRes.data.length || 0,
          trends: 0,
        });
      } catch (error) {
        console.error("❌ Failed to fetch user dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [axiosSecure, user?.email]);

  const pieData = [
    { name: "Orders", value: stats.orders },
    { name: "Watchlist", value: stats.watchlist },
    { name: "Spent", value: stats.trends },
  ];

  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Loading user dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">👤 User Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "My Orders",
            count: stats.orders,
            icon: <ShoppingCart className="w-6 h-6 text-blue-500" />,
            bg: "bg-blue-50 dark:bg-black border border-white",
          },
          {
            title: "Watchlist",
            count: stats.watchlist,
            icon: <Eye className="w-6 h-6 text-purple-500" />,
            bg: "bg-purple-50 dark:bg-black border border-white",
          },
          {
            title: "Total spent amount",
            count: stats.trends,
            icon: <TrendingUp className="w-6 h-6 text-green-500" />,
            bg: "bg-green-50 dark:bg-black border border-white",
          },
        ].map((card) => (
          <Card key={card.title} className={`shadow ${card.bg}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold">{card.count}</h3>
              </div>
              {card.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-10 p-6 bg-white dark:bg-black rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Activity Breakdown</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) =>
                `${name}: ${((value / total) * 100).toFixed(1)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserDashboard;

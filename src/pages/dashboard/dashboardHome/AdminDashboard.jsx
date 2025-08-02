import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Box, ListOrdered, Megaphone, Users } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../components/loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const COLORS = ["#00C49F", "#FF5C7C", "#FFBB28", "#5DADE2", "#9B59B6"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    advertisements: 0,
    users: 0,
    productsStatus: {
      deliverable: 0,
      undeliverable: 0,
      risky: 0,
      unknown: 0,
      duplicate: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, adsRes, usersRes, statusRes] =
          await Promise.all([
            axiosSecure.get("/products"),
            axiosSecure.get("/orders"),
            axiosSecure.get("/admin/advertisements"),
            axiosSecure.get("/users"),
            axiosSecure.get("/products/status"), // Make sure this endpoint exists in your backend
          ]);

        setStats({
          products: productsRes.data.length || 0,
          orders: ordersRes.data.length || 0,
          advertisements: adsRes.data.length || 0,
          users: usersRes.data.length || 0,
          productsStatus: statusRes.data || {},
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  const cards = [
    {
      title: "All Products",
      count: stats.products,
      icon: <Box className="w-6 h-6 text-green-500" />,
      bg: "bg-green-50 dark:bg-black border border-white",
    },
    {
      title: "All Orders",
      count: stats.orders,
      icon: <ListOrdered className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50 dark:bg-black border border-white",
    },
    {
      title: "All Ads",
      count: stats.advertisements,
      icon: <Megaphone className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-50 dark:bg-black border border-white",
    },
    {
      title: "All Users",
      count: stats.users,
      icon: <Users className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-50 dark:bg-black border border-white",
    },
  ];

  const productStatusData = [
    {
      name: "approved",
      value: stats.productsStatus?.approved || 0,
    },
    {
      name: "pending",
      value: stats.productsStatus?.pending || 0,
    },
    // {
    //   name: "Risky",
    //   value: stats.productsStatus?.risky || 0,
    // },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card key={card.title} className={`shadow ${card.bg}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold ">{card.count}</h3>
              </div>
              {card.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <div className="mt-10 p-6 bg-white dark:bg-black rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">📦 Product Status Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productStatusData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {productStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="middle" align="right" layout="vertical" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;

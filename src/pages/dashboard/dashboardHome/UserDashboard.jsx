import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ShoppingCart, Eye, TrendingUp } from "lucide-react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

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
          // axiosSecure.get(`/trends/user?email=${user?.email}`),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Loading user dashboard...</span>
      </div>
    );
  }

  const cards = [
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
      title: "Price Trends",
      count: stats.trends,
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      bg: "bg-green-50 dark:bg-black border border-white",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">👤 User Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
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
    </div>
  );
};

export default UserDashboard;

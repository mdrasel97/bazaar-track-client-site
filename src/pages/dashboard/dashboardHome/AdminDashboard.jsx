import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Box, ListOrdered, Megaphone, Users } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    advertisements: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, adsRes, usersRes] = await Promise.all([
          axiosSecure.get("/products"),
          axiosSecure.get("/orders"),
          axiosSecure.get("/admin/advertisements"),
          axiosSecure.get("/users"),
        ]);

        setStats({
          products: productsRes.data.length || 0,
          orders: ordersRes.data.length || 0,
          advertisements: adsRes.data.length || 0,
          users: usersRes.data.length || 0,
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
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2">Loading admin stats...</span>
      </div>
    );
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
    </div>
  );
};

export default AdminDashboard;

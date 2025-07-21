import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Megaphone, ShoppingBag, Loader2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const VendorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [stats, setStats] = useState({
    products: 0,
    advertisements: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchVendorStats = async () => {
      try {
        const [productRes, adRes] = await Promise.all([
          axiosSecure.get(`/my-products/${user?.email}`),
          axiosSecure.get(`/advertisements?vendorEmail=${user?.email}`),
          //   axiosSecure.get(`/orders/vendor?email=${user?.email}`),
        ]);

        setStats({
          products: productRes.data.length || 0,
          advertisements: adRes.data.length || 0,
          //   orders: orderRes.data.length || 0,
        });
      } catch (err) {
        console.error("Error fetching vendor stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorStats();
  }, [axiosSecure, user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Loading vendor dashboard...</span>
      </div>
    );
  }

  const cards = [
    {
      title: "My Products",
      count: stats.products,
      icon: <Package className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-50 dark:bg-black border border-white",
    },
    {
      title: "Advertisements",
      count: stats.advertisements,
      icon: <Megaphone className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-50 dark:bg-black border border-white",
    },
    {
      title: "Orders Received",
      count: 0,
      icon: <ShoppingBag className="w-6 h-6 text-teal-600" />,
      bg: "bg-teal-50 dark:bg-black border border-white",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 ">🏬 Vendor Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.title} className={`shadow ${card.bg}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-sm ">{card.title}</p>
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

export default VendorDashboard;

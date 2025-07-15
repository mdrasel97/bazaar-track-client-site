import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrderList = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get(`/my-orders?email=${user?.email}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("❌ Failed to load order list");
      }
    };

    fetchOrders();
  }, [axiosSecure, user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Order List</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Market Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.itemName}</TableCell>
              <TableCell>{order.marketName}</TableCell>
              <TableCell>${order.pricePerUnit}</TableCell>
              <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/products/${order._id}`)}>
                  🔍 View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyOrderList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageSearch } from "lucide-react";
import api from "../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#111111] min-h-screen flex items-center justify-center text-[#F5F5F5]">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="bg-[#111111] min-h-screen p-6 text-[#F5F5F5]">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <PackageSearch className="text-[#FF6A00]" />
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-[#9E9E9E]">No orders found</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-[#1E1E1E] rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="text-sm text-[#9E9E9E]">Order ID</p>
                <p className="text-[#FF6A00] font-semibold">
                  {order._id}
                </p>

                <p className="mt-2 text-sm">
                  Payment:{" "}
                  <span className="text-[#9E9E9E]">
                    {order.paymentMethod}
                  </span>
                </p>

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-400"
                        : order.orderStatus === "Confirmed"
                        ? "text-blue-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {order.orderStatus || "Pending"}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  ₹{order.totalAmount}
                </p>

                <button
                  onClick={() =>
                    navigate(`/user/orders/${order._id}`)
                  }
                  className="mt-3 px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C1A] text-black rounded-xl transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

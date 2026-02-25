import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import api from "../utils/api";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#111111] min-h-screen flex items-center justify-center text-[#F5F5F5]">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-[#111111] min-h-screen flex items-center justify-center text-[#F5F5F5]">
        Order not found
      </div>
    );
  }

  return (
    <div className="bg-[#111111] min-h-screen p-6 text-[#F5F5F5]">
      {/* HEADER */}
      <button
        onClick={() => navigate("/user/All orders")}
        className="flex items-center gap-2 text-[#9E9E9E] hover:text-[#FF6A00] mb-6"
      >
        <ArrowLeft size={18} />
        Back to My Orders
      </button>

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Package className="text-[#FF6A00]" />
        Order Details
      </h1>

      {/* ORDER INFO */}
      <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
        <p className="text-sm text-[#9E9E9E]">Order ID</p>
        <p className="text-[#FF6A00] font-semibold break-all mb-3">
          {order._id}
        </p>

        <p className="text-sm">
          Payment Method:{" "}
          <span className="text-[#9E9E9E]">
            {order.paymentMethod}
          </span>
        </p>

        <p className="text-sm">
          Order Status:{" "}
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

        <p className="text-lg font-bold mt-4">
          Total Amount:{" "}
          <span className="text-[#FF6A00]">
            ₹{order.totalAmount}
          </span>
        </p>
      </div>

      {/* ORDER ITEMS */}
      <div className="bg-[#1E1E1E] rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Items in this order
        </h2>

        {order.orderItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 mb-4"
          >
            <img
              src={item.image?.url || item.image}
              alt={item.name}
              className="w-16 h-16 object-contain rounded-lg bg-black"
            />

            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-[#9E9E9E]">
                Qty: {item.qty}
              </p>
            </div>

            <p className="font-bold">
              ₹{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

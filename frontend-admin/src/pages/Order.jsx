import { useEffect, useState } from "react";
import { ShoppingBag, CheckCircle, Eye, X } from "lucide-react";
import api from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/");
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );

      if (selectedOrder?._id === id) {
        setSelectedOrder((prev) => ({
          ...prev,
          orderStatus: status,
        }));
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold uppercase";
    switch (status) {
      case "delivered":
        return `${base} bg-green-500/20 text-green-400`;
      case "shipped":
        return `${base} bg-blue-500/20 text-blue-400`;
      default:
        return `${base} bg-yellow-500/20 text-yellow-400`;
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
          <ShoppingBag className="text-[#FF6A00]" />
        </div>
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-[#9E9E9E]">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-[#9E9E9E]">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1E1E1E] text-[#9E9E9E]">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-[#1E1E1E] hover:bg-white/5"
                >
                  <td className="p-4">{order.user?.name || "User"}</td>
                  <td className="p-4 text-[#9E9E9E]">
                    {order.orderItems.length} items
                  </td>
                  <td className="p-4 text-[#FF6A00] font-semibold">
                    ₹{order.totalAmount}
                  </td>
                  <td className="p-4">
                    <span className={statusBadge(order.orderStatus)}>
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="p-4 flex justify-center gap-2">
                    {/* VIEW */}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-[#FF6A00]/20 p-2 rounded-lg"
                      title="View Order"
                    >
                      <Eye className="text-[#FF6A00]" size={18} />
                    </button>

                    {/* SHIPPED */}
                    <button
                      onClick={() => updateStatus(order._id, "shipped")}
                      className="bg-blue-500/20 p-2 rounded-lg"
                      title="Mark Shipped"
                    >
                      <CheckCircle className="text-blue-400" size={18} />
                    </button>

                    {/* DELIVERED */}
                    <button
                      onClick={() => updateStatus(order._id, "delivered")}
                      className="bg-green-500/20 p-2 rounded-lg"
                      title="Mark Delivered"
                    >
                      <CheckCircle className="text-green-400" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-xl relative">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-[#9E9E9E]"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4">Order Details</h2>

            <p className="text-xs text-[#9E9E9E] mb-2">
              Order ID: {selectedOrder._id}
            </p>

            <p className="mb-3">
              <b>User:</b> {selectedOrder.user?.name}
            </p>

            <p className="mb-4">
              <b>Total:</b>{" "}
              <span className="text-[#FF6A00] font-semibold">
                ₹{selectedOrder.totalAmount}
              </span>
            </p>

            {/* SHIPPING */}
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Shipping Details</h3>
              <p className="text-sm text-[#9E9E9E] leading-relaxed">
                {selectedOrder.shippingDetails.fullName}<br />
                {selectedOrder.shippingDetails.address}<br />
                {selectedOrder.shippingDetails.city} -{" "}
                {selectedOrder.shippingDetails.pincode}<br />
                📞 {selectedOrder.shippingDetails.phone}
              </p>
            </div>

            {/* ITEMS */}
            <div>
              <h3 className="font-semibold mb-2">Items</h3>
              {selectedOrder.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-[#9E9E9E] mb-1"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

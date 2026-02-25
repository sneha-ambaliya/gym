import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import {
  PackageCheck,
  Truck,
  Clock,
  CreditCard,
} from "lucide-react";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = ["processing", "shipped", "delivered"];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
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
      <h1 className="text-3xl font-bold mb-6">
        Order Details
      </h1>

      {/* ORDER INFO */}
      <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="text-[#9E9E9E] text-sm">Order ID</p>
            <p className="font-semibold">{order._id}</p>
          </div>

          <div>
            <p className="text-[#9E9E9E] text-sm">Order Date</p>
            <p className="font-semibold">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-[#9E9E9E] text-sm">Payment</p>
            <p className="font-semibold capitalize flex items-center gap-1">
              <CreditCard size={16} />
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-[#9E9E9E] text-sm">Total</p>
            <p className="font-semibold text-[#FF6A00]">
              ₹{order.totalAmount}
            </p>
          </div>
        </div>
      </div>

      {/* TRACKING */}
      <div className="bg-[#1E1E1E] rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">
          Track Your Order
        </h2>

        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const active =
              steps.indexOf(order.orderStatus) >= index;

            return (
              <div
                key={step}
                className="flex-1 flex flex-col items-center relative"
              >
                {index !== 0 && (
                  <div
                    className={`absolute top-5 left-0 w-full h-[2px] ${
                      active ? "bg-[#FF6A00]" : "bg-gray-700"
                    }`}
                  />
                )}

                <div
                  className={`z-10 p-3 rounded-full ${
                    active
                      ? "bg-[#FF6A00] text-black"
                      : "bg-black text-gray-500"
                  }`}
                >
                  {step === "processing" && <Clock />}
                  {step === "shipped" && <Truck />}
                  {step === "delivered" && <PackageCheck />}
                </div>

                <p
                  className={`mt-2 capitalize text-sm ${
                    active
                      ? "text-[#FF6A00]"
                      : "text-[#9E9E9E]"
                  }`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="bg-[#1E1E1E] rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Items in this order
        </h2>

        <div className="space-y-4">
          {order.orderItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-gray-700 pb-3"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-[#9E9E9E] text-sm">
                  Qty: {item.qty}
                </p>
              </div>

              <p className="font-semibold">
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;

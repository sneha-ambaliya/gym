import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  MapPin,
  Phone,
  User,
  CreditCard,
  Truck,
  ShoppingBag,
} from "lucide-react";

const Checkout = () => {
  const { cartItems } = useCart();
  const { clearCart } = useCart();
  const navigate = useNavigate();

 const placeOrderHandler = async () => {
  try {
    if (cartItems.length === 0) return;

    // 1️⃣ Create Razorpay Order
    const { data } = await api.post("/orders/create-razorpay-order", {
      amount: subtotal,
    });

    const options = {
      key: "rzp_test_SCpiphTN0stUCX",
      amount: data.amount,
      currency: "INR",
      name: "Gym Store",
      description: "Order Payment",
      order_id: data.id,

      handler: async function (response) {
        // 2️⃣ Verify payment
        const verifyRes = await api.post("/orders/verify-payment", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,

          orderData: {
            orderItems: cartItems,
            totalAmount: subtotal,
            paymentMethod: "Razorpay",
            shippingDetails: formData,
          },
        });

        if (verifyRes.data.success) {
          clearCart();
          navigate(`/order-success/${verifyRes.data.order._id}`);
        }
      },

      theme: {
        color: "#FF6A00",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment failed");
  }
};

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-[#111111] min-h-screen p-6 text-[#F5F5F5]">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="text-[#FF6A00]" />
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-[#1E1E1E] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Shipping Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <User className="icon" />
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="input pl-10"
              />
            </div>

            <div className="relative">
              <Phone className="icon" />
              <input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="input pl-10"
              />
            </div>

            <div className="relative">
              <MapPin className="icon" />
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="input pl-10"
              />
            </div>

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="input"
            />
          </div>

          <textarea
            name="address"
            rows="4"
            placeholder="Full Address"
            onChange={handleChange}
            className="input mt-4"
          />

          {/* PAYMENT */}
          {/* <h2 className="text-xl font-semibold mt-6 mb-3">
            Payment Method
          </h2>

          <div className="space-y-3 text-[#9E9E9E]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handleChange}
              />
              <Truck className="text-[#FF6A00]" />
              Cash on Delivery
            </label>

            
          </div> */}
        </div>

        {/* RIGHT */}
        <div className="bg-[#1E1E1E] p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm text-[#9E9E9E] mb-2"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="border-gray-700 my-4" />

          <div className="flex justify-between text-lg font-bold mb-6">
            <span>Total</span>
            <span className="text-[#FF6A00]">₹{subtotal}</span>
          </div>

          <button
  onClick={placeOrderHandler}
  className="w-full bg-[#FF6A00] hover:bg-[#FF8C1A] text-black font-semibold py-3 rounded-xl transition"
>
  Place Order
</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

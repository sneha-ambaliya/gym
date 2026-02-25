import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const { cartItems, removeFromCart, addToCart, decreaseQty } = useCart();
   const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  



  return (
    <div className="bg-[#111111] min-h-screen p-6 text-[#F5F5F5]">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingBag className="text-[#FF6A00]" />
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-[#9E9E9E]">No items added yet</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-[#1E1E1E] rounded-2xl p-4 flex gap-5 items-center"
              >
                <img
                  src={item.image?.url || item.image}
                  alt={item.name}
                  className="h-24 w-24 object-contain rounded-xl bg-black"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-[#FF6A00] font-bold mt-1">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                       onClick={() => decreaseQty(item._id)}
                      className="p-2 bg-black rounded-lg hover:bg-[#FF6A00] transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 bg-black rounded-lg hover:bg-[#FF6A00] transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="bg-[#1E1E1E] rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-[#9E9E9E] mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-[#9E9E9E] mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <hr className="border-gray-700 my-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-[#FF6A00]">₹{subtotal}</span>
            </div>

            <button
  disabled={cartItems.length === 0}
  onClick={() => navigate("/checkout")}
  className="w-full bg-[#FF6A00] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF8C1A] text-black font-semibold py-3 rounded-xl transition"
>
  Proceed to Checkout
</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

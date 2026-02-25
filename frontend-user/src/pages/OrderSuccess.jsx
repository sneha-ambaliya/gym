import { CheckCircle, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  return (
    <div className="bg-[#111111] min-h-screen flex items-center justify-center text-[#F5F5F5] p-6">
      <div className="bg-[#1E1E1E] rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
        <CheckCircle size={72} className="text-[#FF6A00] mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Order Placed Successfully 
        </h1>

        <p className="text-[#9E9E9E] mb-6">
          Thanks for your order! Your items will be delivered soon.
        </p>

        <div className="bg-black rounded-xl p-4 mb-6 text-sm">
          <p className="text-[#9E9E9E]">Order ID</p>
          <p className="text-[#FF6A00] font-semibold break-all">
            {id}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/my-orders")}
            className="w-full bg-[#FF6A00] hover:bg-[#FF8C1A] text-black font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-700 hover:border-[#FF6A00] text-[#F5F5F5] py-3 rounded-xl transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

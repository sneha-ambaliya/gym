import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Package, Layers } from "lucide-react";
import api from "../utils/api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return <p className="text-white text-center mt-10">Loading...</p>;

  const fakePrice = Math.round(product.price * 1.1);

  return (
    <div className="bg-[#111111] min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-[#1E1E1E] rounded-2xl p-6 grid md:grid-cols-2 gap-8">
        <img
          src={product.image?.url}
          alt={product.name}
          className="w-full h-80 object-contain"
        />

        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F5]">
            {product.name}
          </h1>

          <p className="text-[#9E9E9E] mt-3">
            {product.description}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="line-through text-[#9E9E9E]">
              ₹{fakePrice}
            </span>
            <span className="text-2xl font-bold text-[#FF6A00]">
              ₹{product.price}
            </span>
          </div>

          {/* Meta Info */}
          <div className="mt-6 space-y-3 text-[#F5F5F5]">
            <p className="flex items-center gap-2">
              <Layers size={18} className="text-[#FF6A00]" />
              Category: {product.category}
            </p>
            <p className="flex items-center gap-2">
              <Package size={18} className="text-[#FF6A00]" />
              Stock: {product.stock}
            </p>
          </div>

          <button className="mt-6 flex items-center gap-2 bg-[#FF6A00] hover:bg-[#FF8C1A] text-black font-semibold px-6 py-3 rounded-xl transition">
            <ShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

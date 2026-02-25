import { useEffect, useState, useRef } from "react";
import { Info, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import ShopHero from "../components/ShopHero";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const debounceRef = useRef(null);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Debounced Search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (!searchQuery.trim()) {
        fetchProducts();
        return;
      }

      try {
        const res = await api.get(
          `/products/search?q=${searchQuery}`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  // Add to Cart Handler
  const handleAddToCart = (product) => {
    if (product.stock === 0) return;

    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      theme: "dark",
    });
  };

  return (
    <>
      <ShopHero />

      <div className="bg-[#111111] min-h-screen p-6 mb-30">
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />

        <h1 className="text-3xl font-bold text-[#F5F5F5] mb-6 text-center">
          Gym Store
        </h1>

        {/* Search */}
        <div className="flex max-w-md mx-auto mb-8 gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-[#1E1E1E] text-[#F5F5F5] placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
          />
          <div className="flex items-center px-4 py-2 bg-[#FF6A00] text-black rounded-xl">
            <Search size={18} />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-10 md:px-20 mt-10">
          {products.length > 0 ? (
            products.map((p) => {
              const fakePrice = Math.round(p.price * 1.1);
              const isOutOfStock = p.stock === 0;

              return (
                <div
                  key={p._id}
                  className="bg-[#1E1E1E] rounded-2xl p-5 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-[#FF6A00]"
                >
                  <img
                    src={p.image?.url}
                    alt={p.name}
                    className="h-40 w-full object-contain mb-4"
                  />

                  <h3 className="text-lg text-center font-semibold text-[#F5F5F5]">
                    {p.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-[#9E9E9E] line-through text-sm">
                      ₹{fakePrice}
                    </span>
                    <span className="text-xl font-bold text-[#FF6A00]">
                      ₹{p.price}
                    </span>
                  </div>

                  {/* Stock Info */}
                  <p
                    className={`text-center mt-2 text-sm ${
                      isOutOfStock
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : `In Stock (${p.stock})`}
                  </p>

                  {/* Buttons */}
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={isOutOfStock}
                      className={`flex-1 px-4 py-2 rounded-xl font-semibold transition
                        ${
                          isOutOfStock
                            ? "bg-gray-600 cursor-not-allowed text-gray-300"
                            : "bg-[#FF6A00] hover:bg-[#FF8C1A] text-black"
                        }`}
                    >
                      {isOutOfStock
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/product/${p._id}`)
                      }
                      className="flex-1 flex items-center justify-center gap-2 border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black py-2 rounded-xl transition"
                    >
                      <Info size={18} />
                      Details
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-[#9E9E9E] col-span-full mt-10">
              No products found
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
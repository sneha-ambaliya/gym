import { useState } from "react";
import { PackagePlus, Image as ImageIcon } from "lucide-react";
import api from "../utils/api";

const ListProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "protein",
    isActive: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // handle checkbox for isActive
  const handleIsActiveChange = () => {
    setForm({ ...form, isActive: !form.isActive });
  };

  // handle category select
  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  // upload product to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.image) return alert("Please select an image");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("stock", form.stock);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("isActive", form.isActive);
      data.append("image", form.image);

      const res = await api.post("/products", data, { withCredentials: true });
      console.log(res.data);

      alert(" Product added successfully");

      // reset form
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        category: "protein",
        isActive: true,
        image: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert(" Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#1E1E1E] p-8 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
            <PackagePlus className="text-[#FF6A00]" />
          </div>
          <h2 className="text-2xl font-bold">Add New Product</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <label className="block cursor-pointer">
            <div className="border border-dashed border-[#FF6A00] rounded-xl p-5 text-center hover:bg-black transition">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 mx-auto rounded object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-[#9E9E9E]">
                  <ImageIcon />
                  <span>Upload product image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>

          {/* Name */}
          <input
            type="text"
            placeholder="Product name"
            required
            className="w-full p-3 rounded bg-black border text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price (₹)"
            required
            className="w-full p-3 rounded bg-black border text-white"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          {/* Stock */}
          <input
            type="number"
            placeholder="Stock"
            required
            className="w-full p-3 rounded bg-black border text-white"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />

          {/* Category */}
          <select
            value={form.category}
            onChange={handleCategoryChange}
            className="w-full p-3 rounded bg-black border text-white"
          >
            <option value="protein">Protein</option>
            <option value="supplement">Supplement</option>
            <option value="accessory">Accessory</option>
          </select>

          {/* Description */}
          <textarea
            rows="4"
            placeholder="Product description"
            className="w-full p-3 rounded bg-black border text-white resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* Active Toggle */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={handleIsActiveChange}
              className="accent-[#FF6A00]"
            />
            <span>Active</span>
          </label>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-[#FF6A00] py-3 rounded-xl font-bold hover:bg-[#FF8C1A] transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListProduct;

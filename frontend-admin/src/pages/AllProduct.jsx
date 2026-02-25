import { useEffect, useState } from "react";
import { Pencil, Trash2, Package, Image as ImageIcon } from "lucide-react";
import api from "../utils/api";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", { withCredentials: true });
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`, { withCredentials: true });
      setProducts(products.filter((p) => p._id !== id));
    } catch {
      alert(" Failed to delete product");
    }
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditProduct((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      const data = new FormData();
      data.append("name", editProduct.name);
      data.append("price", editProduct.price);
      data.append("stock", editProduct.stock);
      data.append("description", editProduct.description);
      data.append("category", editProduct.category);
      data.append("isActive", editProduct.isActive);
      if (editProduct.image instanceof File) data.append("image", editProduct.image);

      const res = await api.put(`/products/${editProduct._id}`, data, {
        withCredentials: true,
      });

      setProducts((prev) =>
        prev.map((p) => (p._id === editProduct._id ? res.data : p))
      );

      setEditProduct(null);
      setPreview(null);
      alert(" Product updated successfully");
    } catch (err) {
      console.error(err);
      alert(" Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
          <Package className="text-[#FF6A00]" />
        </div>
        <h1 className="text-3xl font-bold">All Products</h1>
      </div>

      {loading ? (
        <p className="text-[#9E9E9E]">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-[#9E9E9E]">No products listed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead className="bg-[#1E1E1E]">
              <tr className="text-left text-[#9E9E9E]">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Category</th>
                <th className="p-4">Active</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-[#1E1E1E] hover:bg-black transition"
                >
                  <td className="p-4">
                    <img
                      src={product.image.url || product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-[#FF6A00] font-semibold">₹{product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.isActive ? "Yes" : "No"}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        className="bg-[#FF6A00]/20 p-2 rounded-lg hover:bg-[#FF6A00]/40 transition"
                        title="Edit"
                        onClick={() => setEditProduct(product)}
                      >
                        <Pencil size={18} className="text-[#FF6A00]" />
                      </button>
                      <button
                        className="bg-red-500/20 p-2 rounded-lg hover:bg-red-500/40 transition"
                        title="Delete"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-[#1E1E1E] w-full max-w-md p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            {/* Image */}
            <label className="block cursor-pointer mb-3">
              <div className="border border-dashed border-[#FF6A00] rounded-xl p-5 text-center hover:bg-black transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-40 mx-auto rounded object-cover"
                  />
                ) : (
                  <img
                    src={editProduct.image.url || editProduct.image}
                    alt="Product"
                    className="h-40 mx-auto rounded object-cover"
                  />
                )}
              </div>
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </label>

            {/* Name */}
            <input
              type="text"
              name="name"
              value={editProduct.name}
              onChange={handleEditChange}
              className="w-full p-3 rounded bg-black border text-white mb-3"
            />

            {/* Price */}
            <input
              type="number"
              name="price"
              value={editProduct.price}
              onChange={handleEditChange}
              className="w-full p-3 rounded bg-black border text-white mb-3"
            />

            {/* Stock */}
            <input
              type="number"
              name="stock"
              value={editProduct.stock}
              onChange={handleEditChange}
              className="w-full p-3 rounded bg-black border text-white mb-3"
            />

            {/* Category */}
            <select
              name="category"
              value={editProduct.category}
              onChange={handleEditChange}
              className="w-full p-3 rounded bg-black border text-white mb-3"
            >
              <option value="protein">Protein</option>
              <option value="supplement">Supplement</option>
              <option value="accessory">Accessory</option>
            </select>

            {/* Description */}
            <textarea
              name="description"
              value={editProduct.description}
              onChange={handleEditChange}
              rows="3"
              className="w-full p-3 rounded bg-black border text-white mb-3 resize-none"
            />

            {/* Active */}
            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                name="isActive"
                checked={editProduct.isActive}
                onChange={handleEditChange}
                className="accent-[#FF6A00]"
              />
              Active
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditProduct(null);
                  setPreview(null);
                }}
                className="px-4 py-2 bg-[#111111] rounded-lg text-[#9E9E9E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C1A] rounded-lg font-semibold text-black"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllProduct;

import { useState } from "react";
import axios from "axios";

const EditPlanModal = ({ plan, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: plan.name,
    monthlyPrice: plan.monthlyPrice,
    yearlyPrice: plan.yearlyPrice,
    features: plan.features.join(", "),
    disabledFeatures: plan.disabledFeatures.join(", "),
    isPopular: plan.isPopular,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        name: form.name,
        monthlyPrice: Number(form.monthlyPrice),
        yearlyPrice: Number(form.yearlyPrice),
        features: form.features
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        disabledFeatures: form.disabledFeatures
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
        isPopular: form.isPopular,
      };

      await axios.put(`http://localhost:5000/api/plans/${plan._id}`, payload);

      setMessage(" Plan updated successfully!");
      onUpdated(); // refresh parent list
      onClose();
    } catch (err) {
      setMessage(err.response?.data?.message || " Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E1E1E] p-6 w-full max-w-md rounded-xl"
      >
        <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-6">
          Edit Plan
        </h2>

        <input
          name="name"
          placeholder="Plan Name"
          value={form.name}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="monthlyPrice"
          placeholder="Monthly Price"
          value={form.monthlyPrice}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="yearlyPrice"
          placeholder="Yearly Price"
          value={form.yearlyPrice}
          onChange={handleChange}
          className="input"
          required
        />
        <textarea
          name="features"
          placeholder="Features (comma separated)"
          value={form.features}
          onChange={handleChange}
          className="input h-24 resize-none"
        />
        <textarea
          name="disabledFeatures"
          placeholder="Disabled Features (comma separated)"
          value={form.disabledFeatures}
          onChange={handleChange}
          className="input h-20 resize-none"
        />
        <label className="flex items-center gap-2 text-[#9E9E9E] mt-3">
          <input
            type="checkbox"
            name="isPopular"
            checked={form.isPopular}
            onChange={handleChange}
          />
          Mark as Popular
        </label>

        {message && (
          <p className="text-sm mt-3 text-[#9E9E9E]">{message}</p>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-[#111111] hover:bg-[#222222] text-[#F5F5F5]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-md bg-[#FF6A00] hover:bg-[#FF8C1A] text-[#111111] font-medium transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlanModal;

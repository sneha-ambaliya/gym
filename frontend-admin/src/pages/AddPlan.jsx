import { useState } from "react";
import api from "../utils/api";   

const AddPlan = () => {
  const [form, setForm] = useState({
    name: "",
    monthlyPrice: "",
    yearlyPrice: "",
    features: "",
    disabledFeatures: "",
    isPopular: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
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

      await api.post("/plans", payload);   // 👈 no localhost now

      setMessage("✅ Plan added successfully!");

      setForm({
        name: "",
        monthlyPrice: "",
        yearlyPrice: "",
        features: "",
        disabledFeatures: "",
        isPopular: false,
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1E1E1E] rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-[#F5F5F5] mb-6">
          Add New Plan
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
          type="number"
          name="monthlyPrice"
          placeholder="Monthly Price"
          value={form.monthlyPrice}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="number"
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
          <p className="text-sm mt-4 text-[#9E9E9E]">{message}</p>
        )}

        <button
          disabled={loading}
          className="w-full mt-6 bg-[#FF6A00] hover:bg-[#FF8C1A] disabled:opacity-60 text-[#111111] py-3 rounded-md font-medium transition"
        >
          {loading ? "Adding..." : "Add Plan"}
        </button>
      </form>
    </div>
  );
};

export default AddPlan;
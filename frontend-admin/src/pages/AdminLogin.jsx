import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/admin/login", {
        email,
        password,
      });

      
      localStorage.setItem("adminInfo", JSON.stringify(data));

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#F5F5F5]">
            Admin Panel
          </h1>
          <p className="text-[#9E9E9E] mt-2 text-sm">
            Secure admin access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-[#9E9E9E] mb-1 block">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#111111] text-white border border-[#2A2A2A] focus:border-[#FF6A00] outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-[#9E9E9E] mb-1 block">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg bg-[#111111] text-white border border-[#2A2A2A] focus:border-[#FF6A00] outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#FF6A00] text-black py-3 rounded-lg font-semibold hover:bg-[#FF8C1A] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-[#9E9E9E] mt-6">
          Authorized admins only
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

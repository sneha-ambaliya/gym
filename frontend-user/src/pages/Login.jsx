import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data);
      navigate("/user/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-[#1E1E1E] p-8 rounded-2xl w-96 shadow-2xl"
      >
        <h1 className="text-4xl font-[Bebas_Neue] text-center mb-6">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 bg-black rounded focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-2 bg-black rounded focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="text-right text-sm mb-4 text-[#9E9E9E]">
          Forgot password?
        </div>

        <button className="w-full bg-[#FF6A00] py-3 rounded font-[Anton] hover:opacity-90 transition">
          Login
        </button>

        {/* Register Option */}
        <p className="text-center text-sm mt-5 text-[#9E9E9E]">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#FF6A00] hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

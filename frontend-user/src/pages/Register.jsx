import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-[#1E1E1E] p-8 rounded-2xl w-96 shadow-2xl"
      >
        <h1 className="text-4xl font-[Bebas_Neue] text-center mb-6">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-4 bg-black rounded focus:outline-none"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 bg-black rounded focus:outline-none"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-black rounded focus:outline-none"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-3 mb-6 bg-black rounded focus:outline-none"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-[#FF6A00] py-3 rounded font-[Anton] hover:bg-[#FF8C1A] transition">
          Register
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-5 text-[#9E9E9E]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF6A00] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

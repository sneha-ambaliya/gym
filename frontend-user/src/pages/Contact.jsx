import { useState } from "react";
import api from "../utils/api";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);
      await api.post("/contact/", formData);
      setSuccess("Message sent successfully ");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF6A00]/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF6A00]/10 rounded-full blur-[120px]" />

      {/* GLASS CARD */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl p-8 
        shadow-[0_0_40px_rgba(255,106,0,0.15)]"
      >
        <h1 className="text-4xl font-[Bebas_Neue] text-[#F5F5F5] mb-2">
          Let’s Talk
        </h1>
        <p className="text-[#9E9E9E] mb-6 text-sm">
          We’d love to hear from you
        </p>

        {success && (
          <p className="text-green-400 mb-4 text-sm">{success}</p>
        )}

        {/* NAME */}
        <div className="flex items-center gap-3 mb-3 
          bg-white/5 border border-white/10 
          backdrop-blur-md rounded-lg px-4 py-3">
          <User size={18} className="text-[#9E9E9E]" />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="bg-transparent outline-none w-full text-[#F5F5F5] placeholder:text-[#9E9E9E]"
          />
        </div>

        {/* EMAIL */}
        <div className="flex items-center gap-3 mb-3 
          bg-white/5 border border-white/10 
          backdrop-blur-md rounded-lg px-4 py-3">
          <Mail size={18} className="text-[#9E9E9E]" />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="bg-transparent outline-none w-full text-[#F5F5F5] placeholder:text-[#9E9E9E]"
          />
        </div>

        {/* MESSAGE */}
        <div className="flex gap-3 mb-5 
          bg-white/5 border border-white/10 
          backdrop-blur-md rounded-lg px-4 py-3">
          <MessageSquare size={18} className="text-[#9E9E9E] mt-1" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Your Message"
            className="bg-transparent outline-none w-full resize-none text-[#F5F5F5] placeholder:text-[#9E9E9E]"
          />
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          disabled={loading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 
          bg-[#FF6A00] py-3 rounded-xl 
          font-[Anton] text-black 
          hover:bg-[#FF8C1A] transition 
          shadow-lg disabled:opacity-60"
        >
          <Send size={18} />
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;

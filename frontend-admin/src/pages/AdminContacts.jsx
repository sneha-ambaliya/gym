import { useEffect, useState } from "react";
import api from "../utils/api";
import { Mail, Check } from "lucide-react";

const AdminContacts = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get("/contact/");
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkReplied = async (id) => {
    try {
      await api.put(`/contact/${id}/replied`);
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, status: "replied" } : msg
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 text-[#F5F5F5]">
        <Mail className="text-[#FF6A00]" size={28} /> Contact Messages
      </h1>

      {/* No Messages */}
      {messages.length === 0 && (
        <p className="text-[#9E9E9E] text-center mt-20 text-lg">
          No messages yet
        </p>
      )}

      {/* Messages List */}
      <div className="space-y-5">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="bg-[#1E1E1E] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-md hover:shadow-lg transition"
          >
            {/* Message Info */}
            <div className="flex-1 mb-4 md:mb-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h3 className="text-lg font-semibold text-[#F5F5F5]">{msg.name}</h3>
                <span className="text-sm text-[#9E9E9E] mt-1 md:mt-0">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-[#9E9E9E] mb-1">📧 {msg.email}</p>
              <p className="text-[#F5F5F5] mb-2">{msg.message}</p>

              <span
                className={`text-sm font-semibold ${
                  msg.status === "new" ? "text-[#FF6A00]" : "text-[#00C851]"
                }`}
              >
                Status: {msg.status.toUpperCase()}
              </span>
            </div>

            {/* Mark Replied Button */}
            {msg.status === "new" && (
              <button
                onClick={() => handleMarkReplied(msg._id)}
                className="flex items-center gap-2 bg-[#FF6A00] hover:bg-[#FF8C1A] text-black font-semibold px-4 py-2 rounded-xl transition"
              >
                <Check size={18} /> Mark Replied
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContacts;

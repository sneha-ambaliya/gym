import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../utils/api";

const Massage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch announcements from backend
  const fetchMessages = async () => {
    try {
      const res = await api.get("/notifications");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="bg-[#111111] p-6 rounded-2xl max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-[#FF6A00]" size={26} />
        <h2 className="text-[#F5F5F5] text-2xl font-bold">
          Announcements
        </h2>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="text-[#9E9E9E] text-center">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="text-[#9E9E9E] text-center">
            No announcements yet.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-[#1E1E1E] border border-[#2A2A2A] p-4 rounded-xl hover:border-[#FF6A00] transition"
            >
              <p className="text-[#F5F5F5] mb-2">
                {msg.message}
              </p>
              <span className="text-[#9E9E9E] text-xs">
                {msg.date}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Massage;

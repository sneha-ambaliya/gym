import React, { useState, useRef, useEffect } from "react";
import api from "../utils/api"
import { Bot, User, Send } from "lucide-react";

const ChatBoard = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
  if (!message.trim()) return;

  setLoading(true);

  try {
    const response = await api.post("/chat", { message });

    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "ai", text: response.data.reply },
    ]);

    setMessage("");
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] flex flex-col mx-60">
      
      {/* HEADER */}
      <div className="p-4 border-b border-[#1E1E1E] text-center font-semibold flex items-center justify-center gap-2">
        <Bot className="text-[#FF6A00]" size={20} />
        Gym AI Coach
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.length === 0 && (
          <p className="text-[#9E9E9E] text-center mt-10">
            Ask me about workouts, diet, or supplements 
          </p>
        )}

        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              chat.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* ICON */}
            {chat.role === "ai" && (
              <Bot size={18} className="text-[#FF6A00] mt-1" />
            )}

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${
                  chat.role === "user"
                    ? "bg-[#1E1E1E]"
                    : "bg-[#FF6A00] text-white"
                }
              `}
            >
              {chat.text}
            </div>

            {chat.role === "user" && (
              <User size={18} className="text-[#9E9E9E] mt-1" />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-[#1E1E1E] flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask your gym coach..."
          className="
            flex-1 px-4 py-3 rounded-xl
            bg-[#1E1E1E]
            text-[#F5F5F5]
            placeholder-[#9E9E9E]
            focus:outline-none
            focus:ring-2 focus:ring-[#FF6A00]
          "
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="
            px-4 py-3 rounded-xl font-semibold
            bg-[#FF6A00] text-white
            hover:bg-[#FF8C1A]
            disabled:opacity-50
            transition
            flex items-center gap-2
          "
        >
          {loading ? "..." : <Send size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;

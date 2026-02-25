import { useEffect, useState } from "react";
import { Megaphone, Plus, Trash2 } from "lucide-react";
import api from "../utils/api";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 GET all announcements
  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // 🔹 CREATE announcement
  const submitAnnouncement = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    try {
      const res = await api.post("/notifications", {
        title,
        message,
      });

      setAnnouncements((prev) => [res.data, ...prev]);
      setTitle("");
      setMessage("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert(" Failed to add announcement");
    }
  };

  // 🔹 DELETE announcement
  const deleteAnnouncement = async (id) => {
    if (!confirm("Delete this announcement?")) return;

    try {
      await api.delete(`/notifications/${id}`);
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert(" Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
            <Megaphone className="text-[#FF6A00]" />
          </div>
          <h1 className="text-3xl font-bold">Announcements</h1>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#FF6A00] hover:bg-[#FF8C1A] text-black px-4 py-2 rounded-lg font-semibold"
        >
          <Plus size={18} /> Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1E1E1E] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-[#9E9E9E]">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-[#9E9E9E]">
                  Loading...
                </td>
              </tr>
            ) : announcements.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-[#9E9E9E]">
                  No announcements yet
                </td>
              </tr>
            ) : (
              announcements.map((a) => (
                <tr
                  key={a._id}
                  className="border-b border-black hover:bg-[#111111]"
                >
                  <td className="p-4 font-semibold text-[#FF6A00]">
                    {a.title}
                  </td>
                  <td className="p-4">{a.message}</td>
                  <td className="p-4 text-center text-[#9E9E9E]">
                    {a.date}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => deleteAnnouncement(a._id)}
                      className="bg-red-500/20 p-2 rounded-lg hover:bg-red-500/40"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            onSubmit={submitAnnouncement}
            className="bg-[#1E1E1E] w-full max-w-md p-6 rounded-2xl"
          >
            <h2 className="text-xl font-bold mb-4">New Announcement</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
              className="w-full mb-3 bg-black text-[#F5F5F5] p-3 rounded-lg outline-none"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Enter announcement message..."
              className="w-full bg-black text-[#F5F5F5] p-3 rounded-lg outline-none resize-none"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-[#111111] rounded-lg text-[#9E9E9E]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-[#FF6A00] hover:bg-[#FF8C1A] rounded-lg font-semibold text-black"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Announcement;

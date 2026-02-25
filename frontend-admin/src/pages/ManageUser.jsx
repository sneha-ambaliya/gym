import { useEffect, useState } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Save
} from "lucide-react";
import api from "../utils/api";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open modal
  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setForm({ name: "", email: "", role: "user" });
    }
    setModalOpen(true);
  };

  // Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await api.put(`/admin/users/${editingUser.id}`, form);
      } else {
        await api.post("/admin/users", form);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert("Operation failed",err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert("Delete failed",err);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
            <Users className="text-[#FF6A00]" size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className="text-[#9E9E9E] text-sm">
              View, add, edit or remove users
            </p>
          </div>
        </div>

        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#FF6A00] px-5 py-2 rounded-xl font-semibold hover:bg-[#FF8C1A] transition"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#1E1E1E] rounded-2xl overflow-x-auto shadow-lg">
        <table className="w-full">
          <thead className="bg-black text-[#9E9E9E]">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-[#9E9E9E]">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-[#9E9E9E]">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-black hover:bg-black transition"
                >
                  <td className="p-4 font-semibold">{user.name}</td>
                  <td className="p-4 text-[#9E9E9E]">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openModal(user)}
                        className="text-[#FF6A00] hover:text-[#FF8C1A]"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full p-3 rounded bg-black border text-white"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                required
                className="w-full p-3 rounded bg-black border text-white"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <select
                className="w-full p-3 rounded bg-black border text-white"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#FF6A00] py-3 rounded-xl font-semibold flex justify-center gap-2 hover:bg-[#FF8C1A]"
              >
                <Save size={18} />
                {editingUser ? "Update User" : "Create User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;

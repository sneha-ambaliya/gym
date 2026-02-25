import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle } from "lucide-react";
import api from "../utils/api";

//  Safe percentage helper
const getPercentage = (present = 0, total = 0) => {
  if (!total || total === 0) return 0;
  return Math.round((present / total) * 100);
};

const UserAttendance = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance/admin/user-attendance", {
          withCredentials: true,
        });
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load attendance", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // 📊 Stats
  const avgAttendance =
    users.length === 0
      ? 0
      : Math.round(
          users.reduce(
            (acc, u) =>
              acc + getPercentage(u.present, u.totalDays),
            0
          ) / users.length
        );

  const lowAttendanceCount = users.filter(
    (u) => getPercentage(u.present, u.totalDays) < 75
  ).length;

  return (
    <div className="min-h-screen bg-[#111111] text-[#F5F5F5] p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#FF6A00]/20 p-3 rounded-xl">
          <Users className="text-[#FF6A00]" size={26} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">User Attendance</h1>
          <p className="text-[#9E9E9E] text-sm">
            Overview of all users attendance
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Avg. Present %"
          value={`${avgAttendance}%`}
          icon={<CheckCircle size={22} />}
        />

        <StatCard
          title="Low Attendance"
          value={lowAttendanceCount}
          icon={<XCircle size={22} />}
        />
      </div>

      {/* Table */}
      <div className="bg-[#1E1E1E] rounded-2xl overflow-x-auto shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-black text-[#9E9E9E]">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Total Days</th>
              <th className="p-4">Present</th>
              <th className="p-4">Attendance %</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-[#9E9E9E]">
                  Loading attendance...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-[#9E9E9E]">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const percentage = getPercentage(
                  user.present,
                  user.totalDays
                );

                return (
                  <tr
                    key={user.id}
                    className="border-b border-black hover:bg-black transition"
                  >
                    <td className="p-4 font-semibold">{user.name}</td>
                    <td className="p-4 text-[#9E9E9E]">{user.email}</td>
                    <td className="p-4">{user.totalDays ?? 0}</td>
                    <td className="p-4 text-green-400 font-semibold">
                      {user.present ?? 0}
                    </td>
                    <td
                      className={`p-4 font-bold ${
                        percentage >= 75
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {percentage}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAttendance;

/* -------------------- */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#1E1E1E] rounded-2xl p-6 flex items-center justify-between shadow-md">
    <div>
      <p className="text-[#9E9E9E] text-sm mb-1">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
    <div className="bg-[#FF6A00]/20 p-3 rounded-xl text-[#FF6A00]">
      {icon}
    </div>
  </div>
);

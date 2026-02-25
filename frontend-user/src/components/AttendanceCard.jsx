import { useEffect, useState } from "react";
import api from "../utils/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AttendanceCard = ({ refreshKey }) => {
  const [streak, setStreak] = useState(0);
  const [lastAttendance, setLastAttendance] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);

  const fetchAttendanceData = async () => {
    try {
      // 1️⃣ Get streak + last attendance
      const streakRes = await api.get("/attendance/my-streak", { withCredentials: true });
      setStreak(streakRes.data.streak);
      setLastAttendance(streakRes.data.lastAttendanceDate);

      // 2️⃣ Get full attendance history
      const listRes = await api.get("/attendance/my-attendance", { withCredentials: true });
      setAttendanceList(listRes.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [refreshKey]); // refresh whenever this key changes

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-lg">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Attendance</h2>

      <p><strong>Current Streak:</strong> {streak} days</p>
      <p><strong>Last Attendance:</strong> {lastAttendance || "Not marked yet"}</p>

      <h3 className="mt-4 font-medium mb-2">Attendance History:</h3>
      {attendanceList.length === 0 ? (
        <p className="text-gray-400">No attendance yet</p>
      ) : (
        <ul className="space-y-1 max-h-40 overflow-y-auto">
          {attendanceList.map((att) => (
            <li
              key={att._id}
              className="bg-[#2A2A2A] px-3 py-1 rounded-md flex justify-between text-sm"
            >
              {att.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceCard;

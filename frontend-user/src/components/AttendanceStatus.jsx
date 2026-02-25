import { useEffect, useState } from "react";
import api from "../utils/api";

const AttendanceStatus = () => {
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await api.get("/attendance/my-streak", {
          withCredentials: true,
        });

        setStreak(res.data.streak);
      } catch (err) {
        console.error("Failed to fetch streak", err);
      }
    };

    fetchStreak();
  }, []);

  if (streak === null) {
    return <p className="text-white">Loading streak...</p>;
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded">
       Attendance Streak:{" "}
      <span className="text-green-400 font-bold">{streak}</span>
    </div>
  );
};

export default AttendanceStatus;

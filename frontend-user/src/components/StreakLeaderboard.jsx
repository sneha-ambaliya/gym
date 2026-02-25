import { useEffect, useState } from "react";
import api from "../utils/api";

const StreakLeaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/attendance/leaderboard")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-2xl">
      <h2 className="text-xl mb-4 font-bold"> Streak Leaderboard</h2>

      {users.map((u, i) => (
        <div
          key={i}
          className="flex justify-between items-center bg-[#2A2A2A] px-4 py-3 rounded-lg mb-2"
        >
          <span className="font-medium">
            #{i + 1} {u.name}
          </span>

          <span className="text-[#FF6A00] font-bold">
            {u.streak} days
          </span>
        </div>
      ))}
    </div>
  );
};

export default StreakLeaderboard;

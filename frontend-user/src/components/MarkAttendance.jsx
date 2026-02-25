import { useState } from "react";
import api from "../utils/api";

const MarkAttendance = () => {
  const [status, setStatus] = useState("");

  const markAttendance = async () => {
    try {
      await api.post("/attendance/mark");
      setStatus("Attendance marked ");
    } catch (err) {
      setStatus("Already marked or error " + err);
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl mb-4">Mark Attendance</h2>

      <button
        onClick={markAttendance}
        className="bg-orange-500 px-6 py-2 rounded"
      >
        Mark Attendance
      </button>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default MarkAttendance;

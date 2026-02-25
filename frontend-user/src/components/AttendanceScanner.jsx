import { useState } from "react";
import api from "../utils/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AttendanceScanner = () => {
  const [qr, setQr] = useState("");

  const markAttendance = async () => {
    try {
      await api.post("/attendance/mark", { qrToken: qr });
      toast.success("Attendance marked successfully ");
    } catch (err) {
      toast.error("Invalid or already used QR");
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-xl">
      <ToastContainer />
      <h2 className="text-xl mb-4 font-semibold">Attendance</h2>

      <input
        type="text"
        placeholder="Scan / Paste QR Code"
        className="w-full p-3 mb-4 bg-black rounded"
        onChange={(e) => setQr(e.target.value)}
      />

      <button
        onClick={markAttendance}
        className="w-full bg-[#FF6A00] py-3 rounded font-[Anton] hover:bg-[#FF8C1A]"
      >
        Mark Attendance
      </button>
    </div>
  );
};

export default AttendanceScanner;

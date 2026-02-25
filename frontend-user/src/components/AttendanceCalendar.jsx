import { useEffect, useState } from "react";
import api from "../utils/api";

const AttendanceCalendar = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    api.get("/attendance/mark")
      .then(res => {
        const onlyDates = res.data.map(a => a.date);
        setDates(onlyDates);
      });
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-[#1E1E1E] p-6 rounded-2xl">
      <h2 className="text-xl mb-4 font-bold"> Attendance</h2>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => {
          const day = String(i + 1).padStart(2, "0");
          const date = `${today.slice(0, 8)}${day}`;

          const attended = dates.includes(date);

          return (
            <div
              key={i}
              className={`h-10 flex items-center justify-center rounded-lg text-sm
                ${attended ? "bg-[#FF6A00]" : "bg-[#2A2A2A]"}
              `}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendar;

import { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import BMICard from "../components/BMICard";
import AttendanceCard from "../components/AttendanceCard";

const Profile = () => {
  const [refreshAttendance, setRefreshAttendance] = useState(0);

  // If you ever want to refresh attendance manually, you can still use this
  // const handleRefresh = () => setRefreshAttendance(prev => prev + 1);

  return (
    <>
      <h1 className="text-4xl font-[Bebas_Neue] mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ProfileCard />
        <BMICard />
        <AttendanceCard refreshKey={refreshAttendance} />
      </div>
    </>
  );
};

export default Profile;

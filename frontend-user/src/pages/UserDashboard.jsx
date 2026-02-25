import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-[#111] text-white">
      <UserSidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;

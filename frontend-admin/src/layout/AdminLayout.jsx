import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#111111] flex text-[#F5F5F5]">
      {/* Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

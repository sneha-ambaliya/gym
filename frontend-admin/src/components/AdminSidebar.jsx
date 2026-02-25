import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  QrCode,
  Users,
  ClipboardList,
  LogOut,
  Scroll,
  Eye,
    Megaphone,
    ShoppingBag,
    Mail,
} from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="bg-[#1E1E1E] w-64 min-h-screen flex flex-col h-full  p-6">
      {/* Brand */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#FF6A00]">
          Gym<span className="text-[#F5F5F5]">Admin</span>
        </h1>
        <p className="text-sm text-[#9E9E9E] mt-1">
          Control & Analytics
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <SidebarLink
          to="/admin/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />
        <SidebarLink
          to="/admin/generate-qr"
          icon={<QrCode size={20} />}
          label="Generate QR"
        />
        <SidebarLink
          to="/admin/attendance"
          icon={<ClipboardList size={20} />}
          label="Attendance"
        />
        {/* <SidebarLink
          to="/admin/users"
          icon={<Users size={20} />}
          label="Users"
        /> */}
        <SidebarLink
          to="/admin/products"
          icon={<Scroll size={20} />}
          label="Add Products"
        />
        <SidebarLink
          to="/admin/product"
          icon={<Eye size={20} strokeWidth={2.25} absoluteStrokeWidth />}
          label="All Products"
        />

        <SidebarLink
          to="/admin/order"
          icon={<ShoppingBag size={20} strokeWidth={2.25} absoluteStrokeWidth />}
          label="Orders"
        />

        <SidebarLink
            to="/admin/announcement"
            icon={<Megaphone size={20} strokeWidth={2.25} absoluteStrokeWidth />}
            label="Announcements"
        />
        <SidebarLink
            to="/admin/contacts"
            icon={<Mail size={20} strokeWidth={2.25} absoluteStrokeWidth />}
            label="Contacts"
        />

         <SidebarLink
            to="/admin/addplan"
            icon={<Mail size={20} strokeWidth={2.25} absoluteStrokeWidth />}
            label="Add plan"
        />

         <SidebarLink
            to="/admin/manageplan"
            icon={<Mail size={20} strokeWidth={2.25} absoluteStrokeWidth />}
            label="Manage plan"
        />



       
      </nav>

      {/* Footer */}
      <button className="flex items-center gap-3 text-[#9E9E9E] hover:text-[#FF6A00] transition">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
      ${
        isActive
          ? "bg-[#FF6A00] text-black font-semibold"
          : "text-[#9E9E9E] hover:bg-[#2A2A2A] hover:text-[#F5F5F5]"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default AdminSidebar;

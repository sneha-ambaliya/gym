import { NavLink } from "react-router-dom";
import {
  User,
  CalendarCheck,
  NotebookText,
  LogOut,
  MessageCircle,
  Bell,
  ShoppingCart,
  CircleStar
} from "lucide-react";

const UserSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-[#111111] text-[#F5F5F5] p-6 border-r border-[#1E1E1E]">
      
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold text-[#FF6A00] mb-10 tracking-wide">
        Gym Dashboard
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavItem to="/user/profile" icon={<User size={20} />} label="My Profile" />
        <NavItem
          to="/user/attendance"
          icon={<CalendarCheck size={20} />}
          label="Attendance"
        />
        <NavItem
          to="/user/notes"
          icon={<NotebookText size={20} />}
          label="Notes"
        />
        <NavItem
          to="/user/massage"
          icon={<Bell size={20} strokeWidth={2.25} absoluteStrokeWidth />}
          label="Notifications"
        />

        <NavItem
          to="/user/cart"
          icon={<ShoppingCart />}
          label="cart"
        />

        <NavItem to="/user/my-orders" icon={<CircleStar />} label="Orders" />


        

        {/* Divider */}
        <div className="my-4 border-t border-[#1E1E1E]" />

        {/* Logout */}
        <button
          className="flex items-center gap-3 p-3 rounded-lg text-[#F5F5F5] hover:bg-red-600/20 hover:text-red-400 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </nav>
    </aside>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-lg transition ${
        isActive
          ? "bg-[#FF6A00] text-black font-semibold"
          : "hover:bg-[#1E1E1E] text-[#9E9E9E]"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export default UserSidebar;

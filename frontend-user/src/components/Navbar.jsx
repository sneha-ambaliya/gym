import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#1E1E1E] px-6 py-4 flex justify-between items-center relative">
      
      {/* LOGO — unchanged */}
      <h1 className="text-3xl text-[rgb(255,106,0)] font-[Bebas_Neue]">
        GYMFLEX
      </h1>

      {/* DESKTOP MENU — EXACT SAME ALIGNMENT */}
      <div className="hidden md:flex space-x-5 text-sm">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
       
        {/* <Link to="/chatbot">Chatbot</Link> */}
      </div>

      <div className="hidden md:flex space-x-5 text-sm">
        {user ? (
          <>
            <Link to="/user/profile">Profile</Link>
            <button onClick={logout} className="text-red-400">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      {/* MOBILE MENU BUTTON — ONLY shows on mobile */}
      <button
        className="md:hidden text-[#F5F5F5]"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* MOBILE MENU — DOES NOT AFFECT DESKTOP */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-[#1E1E1E] border-t border-[#2A2A2A] px-6 py-6 space-y-4 md:hidden z-50">
          
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/about">About</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
          <Link onClick={() => setOpen(false)} to="/shop">Shop</Link>
          <Link onClick={() => setOpen(false)} to="/chatbot">Chatbot</Link>

          <hr className="border-[#2A2A2A]" />

          {user ? (
            <>
              <Link onClick={() => setOpen(false)} to="/user/profile">
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <Link onClick={() => setOpen(false)} to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

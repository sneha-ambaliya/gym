import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaTiktok,
  FaLocationDot,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";

const Footer = () => {
  const socialIcons = [
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
    FaTiktok,
  ];

  const navLinks = ["Home", "About Us", "Services", "Doctors", "Contact Us"];

  const quickLinks = [
    "Privacy Policy",
    "Terms & Conditions",
    "Documentation",
    "Support",
  ];

  return (
    <footer className="bg-[#111111] text-[#F5F5F5] px-6 md:px-20 py-5">
      
      {/* 🔥 Top CTA Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            GET STARTED <span className="text-[#FF6A00]">TODAY!</span>
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            FIRST SESSION FREE
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-[#9E9E9E] mb-6 leading-relaxed">
            Booking your appointment is quick and easy — choose your preferred
            time, and we’ll take care of the rest.
          </p>
          <button className="bg-[#FF6A00] text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-[#FF8C1A] hover:scale-105">
            Start Free Trial →
          </button>
        </div>
      </div>

      <hr className="border-[#1E1E1E] my-8" />

      {/* 🧩 Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Revamp</h3>
          <p className="text-[#9E9E9E] mb-6 leading-relaxed">
            Through personalized coaching and cutting edge techniques and
            support we help you achieve your fitness goals.
          </p>

          <div className="flex gap-4">
            {socialIcons.map((Icon, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] text-[#FF6A00] p-3 rounded-full cursor-pointer 
                transition-all duration-700 hover:rotate-[360deg] 
                hover:bg-[#FF6A00] hover:text-black"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Navigation</h3>
          <ul className="space-y-3 text-[#9E9E9E]">
            {navLinks.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer transition hover:text-[#FF6A00]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-[#9E9E9E]">
            {quickLinks.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer transition hover:text-[#FF6A00]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <div className="space-y-5 text-[#9E9E9E]">
            <div className="flex items-start gap-3">
              <FaLocationDot className="mt-1 text-[#FF6A00]" />
              <p>736 Blue Spring Ave. Smithtown, NY 11787</p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#FF6A00]" />
              <p>info@helpline.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-[#FF6A00]" />
              <p>+0345459495859</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-[#1E1E1E] my-2" />

      {/* Bottom */}
      <div className="text-center text-[#9E9E9E] text-sm">
        © 2025. Made with love by Sneha
      </div>
    </footer>
  );
};

export default Footer;

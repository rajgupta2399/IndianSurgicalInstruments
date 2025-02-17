"use client";
import { useState } from "react";
import { Home, List, Mail, User, Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/ISI.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar for Large Screens */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm lg:block hidden">
        <nav className="mx-auto h-16 max-w-7xl px-5 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-gray-900">
            <Image width={100} height={100} src={Logo} alt="logo" />
          </a>

          {/* Full Navbar for Large Screens */}
          <ul className="flex gap-6">
            <li>
              <a href="#" className="nav-link">Home</a>
            </li>
            <li>
              <a href="#" className="nav-link">Category</a>
            </li>
            <li>
              <a href="#" className="nav-link">Contact</a>
            </li>
            <li>
              <a href="#" className="nav-link">Profile</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Mobile Navigation (Logo + Menu Button) */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm lg:hidden">
        <nav className="mx-auto h-16 max-w-7xl px-5 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-gray-900">
            <Image width={100} height={100} src={Logo} alt="logo" />
          </a>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md lg:hidden">
        <ul className="flex justify-around py-2">
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <List className="h-5 w-5" />
              <span className="text-xs">Category</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <Mail className="h-5 w-5" />
              <span className="text-xs">Contact</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;

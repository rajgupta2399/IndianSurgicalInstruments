"use client";
import {
  Home,
  User,
  LayoutGrid,
  ShoppingCart,
  CodesandboxIcon,
} from "lucide-react";
import Image from "next/image";
import Logo from "../assets/logo1.png";
import { Search, MessageCircle } from "lucide-react";
import Link from "next/link";
import whatsapp from "../assets/whatsapp.png";

const Header = () => {
  return (
    <>
      {/* Top Navbar for Large Screens */}
      <header className="fixed left-0 top-0 z-50 hidden w-full bg-white shadow-sm lg:block">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-10">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 text-gray-900">
              <Image width={110} height={100} src={Logo} alt="logo" />
            </a>

            {/* Navigation Links */}
            <ul className="flex gap-0">
              <li>
                <Link
                  href="#"
                  className="nav-link flex items-center gap-1 align-middle"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase">
                    Browse Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link flex items-center gap-1 align-middle"
                >
                  <CodesandboxIcon className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase">
                    Popular Brands
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Center - Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-900 hover:text-green-600">
              <MessageCircle size={24} />
            </a>
            <a href="#" className="text-gray-900 hover:text-blue-600">
              <User size={24} />
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation (Logo + Menu Button) */}
      <header className="fixed left-0 top-0 z-50 w-full bg-slate-50 shadow-sm lg:hidden">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-gray-900">
            <Image width={100} height={100} src={Logo} alt="logo" />
          </a>
          <div className="flex items-center gap-3 align-middle">
            <a href="#" className="">
              <Image src={whatsapp} alt="whatsapp" width={25} height={50} />
            </a>

            <a href="#" className="flex flex-col items-center text-gray-700">
              <ShoppingCart className="h-5 w-6" />
            </a>
          </div>
        </nav>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-slate-50 shadow-lg lg:hidden">
        <ul className="flex justify-around py-3">
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <Home className="h-5 w-5" />
              <span className="text-xs font-semibold">Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <LayoutGrid className="h-5 w-5" />
              <span className="text-xs font-semibold">Categories</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs font-semibold">Cart</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <User className="h-5 w-5" />
              <span className="text-xs font-semibold">Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;

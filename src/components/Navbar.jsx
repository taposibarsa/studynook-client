"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaDoorOpen,
  FaPlusCircle,
  FaClipboardList,
  FaBookOpen,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <FaHome />
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/rooms"
          className="flex items-center gap-2 hover:text-blue-600 transition"
        >
          <FaDoorOpen />
          Rooms
        </Link>
      </li>

      {user && (
        <>
          <li>
            <Link
              href="/add-room"
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <FaPlusCircle />
              Add Room
            </Link>
          </li>

          <li>
            <Link
              href="/my-listings"
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <FaClipboardList />
              My Listings
            </Link>
          </li>

          <li>
            <Link
              href="/my-bookings"
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <FaBookOpen />
              My Bookings
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
              S
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                StudyNook
              </h1>

              <p className="text-xs text-gray-500 -mt-1">
                Study Room Booking
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
            {navLinks}
          </ul>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Image
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt="user"
                    width={44}
                    height={44}
                    className="rounded-full object-cover border-2 border-blue-500 w-11 h-11"
                  />

                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">
                      {user?.displayName || "User"}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Welcome Back
                    </p>
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[100] menu p-3 shadow-lg bg-white rounded-2xl w-60 mt-4 border border-gray-100"
                >
                  <li>
                    <Link href="/my-listings">
                      <FaClipboardList />
                      My Listings
                    </Link>
                  </li>

                  <li>
                    <Link href="/my-bookings">
                      <FaBookOpen />
                      My Bookings
                    </Link>
                  </li>

                  <li>
                    <Link href="/add-room">
                      <FaPlusCircle />
                      Add Room
                    </Link>
                  </li>

                  <div className="divider my-1"></div>

                  <li>
                    <button onClick={handleLogout}>
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-gray-700"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-5 py-5">

            {user && (
              <div className="flex items-center gap-3 mb-5 border-b pb-4">
                <Image
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-blue-500 w-12 h-12"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {user?.displayName || "User"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            <ul className="space-y-4 text-gray-700 font-medium">
              {navLinks}
            </ul>

            {!user ? (
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/login"
                  className="w-full text-center py-2 rounded-xl border border-blue-600 text-blue-600 font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="w-full text-center py-2 rounded-xl bg-blue-600 text-white font-medium"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="mt-6 w-full py-2 rounded-xl bg-red-500 text-white font-medium flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
"use client";

import Link from "next/link";
import ExternalImage from "./ExternalImage";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
import ThemeSwitch from "./ThemeSwitch";

function NavItem({ href, icon: Icon, label, pathname, onNavigate }) {
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className={`text-lg flex items-center gap-2 transition-all duration-300 hover:text-[#F59E0B] hover:scale-110 ${
          isActive
            ? "text-[#F59E0B] font-semibold"
            : "text-black dark:text-white"
        }`}
      >
        <Icon />
        {label}
      </Link>
    </li>
  );
}

const Navbar = ({ user, handleLogout, loading }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showUser = mounted && !loading && user;
  const showGuest = mounted && !loading && !user;
  const closeMenu = () => setMenuOpen(false);

  const buttonStyle =
    "px-5 py-2 rounded-md border-2 border-black text-black dark:text-white dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-medium";

  const navLinks = (
    <>
      <NavItem href="/" icon={FaHome} label="Home" pathname={pathname} onNavigate={closeMenu} />
      <NavItem href="/rooms" icon={FaDoorOpen} label="Rooms" pathname={pathname} onNavigate={closeMenu} />
      {showUser && (
        <>
          <NavItem href="/add-room" icon={FaPlusCircle} label="Add Room" pathname={pathname} onNavigate={closeMenu} />
          <NavItem href="/my-listings" icon={FaClipboardList} label="My Listings" pathname={pathname} onNavigate={closeMenu} />
          <NavItem href="/my-bookings" icon={FaBookOpen} label="My Bookings" pathname={pathname} onNavigate={closeMenu} />
        </>
      )}
    </>
  );

  const dropdownLinkClass =
    "flex items-center gap-2 py-2 px-2 rounded-lg text-black dark:text-white hover:bg-[#F59E0B]/20 hover:text-[#F59E0B] transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/St.png"
              alt="StudyNook logo"
              width={170}
              height={60}
              className="h-[60px] w-auto max-w-[170px] object-contain"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 font-medium">{navLinks}</ul>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitch />
            {loading ? (
              <span className="text-sm text-gray-500 w-20">...</span>
            ) : showGuest ? (
              <>
                <Link
                  href="/login"
                  className={`${buttonStyle} ${pathname === "/login" ? "bg-[#F59E0B] border-[#F59E0B]" : ""}`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`${buttonStyle} ${pathname === "/register" ? "bg-[#F59E0B] border-[#F59E0B]" : ""}`}
                >
                  Register
                </Link>
              </>
            ) : showUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <ExternalImage
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="user"
                    width={44}
                    height={44}
                    className="rounded-full object-cover border-2 border-black dark:border-white w-11 h-11"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-black dark:text-white">{user.displayName}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Welcome Back</p>
                  </div>
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 top-full mt-2 p-3 shadow-lg bg-white dark:bg-black rounded-2xl w-60 border border-gray-200 dark:border-zinc-700 z-[100]">
                    <li>
                      <Link href="/my-listings" className={dropdownLinkClass} onClick={() => setDropdownOpen(false)}>
                        <FaClipboardList /> My Listings
                      </Link>
                    </li>
                    <li>
                      <Link href="/my-bookings" className={dropdownLinkClass} onClick={() => setDropdownOpen(false)}>
                        <FaBookOpen /> My Bookings
                      </Link>
                    </li>
                    <li>
                      <Link href="/add-room" className={dropdownLinkClass} onClick={() => setDropdownOpen(false)}>
                        <FaPlusCircle /> Add Room
                      </Link>
                    </li>
                    <li className="border-t border-gray-200 dark:border-zinc-700 my-2" />
                    <li>
                      <button type="button" onClick={handleLogout} className={`${dropdownLinkClass} w-full text-left`}>
                        <FaSignOutAlt /> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeSwitch />
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-black dark:text-white"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 shadow-md">
          <div className="px-5 py-5">
            {showUser && (
              <div className="flex items-center gap-3 mb-5 border-b border-gray-200 dark:border-gray-700 pb-4">
                <ExternalImage
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-black dark:border-white w-12 h-12"
                />
                <div>
                  <h3 className="font-semibold text-black dark:text-white">{user.displayName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              </div>
            )}
            <ul className="space-y-5 font-medium">{navLinks}</ul>
            {showGuest ? (
              <div className="flex flex-col gap-3 mt-6">
                <Link href="/login" className={`${buttonStyle} text-center`} onClick={closeMenu}>
                  Login
                </Link>
                <Link href="/register" className={`${buttonStyle} text-center`} onClick={closeMenu}>
                  Register
                </Link>
              </div>
            ) : showUser ? (
              <button
                type="button"
                onClick={() => { handleLogout(); closeMenu(); }}
                className="mt-6 w-full py-3 rounded-md border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#F59E0B] hover:border-[#F59E0B] transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

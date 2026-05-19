"use client";

import Image from "next/image";
import Link from "next/link";
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
    FaMoon,
    FaSun,
} from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = ({ user, handleLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Theme Toggle
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const navStyle =
        "text-lg text-black dark:text-white flex items-center gap-2 transition-all duration-300 hover:text-blue-600 hover:scale-110";

    const buttonStyle =
        "px-5 py-2 rounded-md border-2 border-black text-black dark:text-white dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-medium";

    const navLinks = (
        <>
            <li>
                <Link href="/" className={navStyle}>
                    <FaHome />
                    Home
                </Link>
            </li>

            <li>
                <Link href="/rooms" className={navStyle}>
                    <FaDoorOpen />
                    Rooms
                </Link>
            </li>

            {user && (
                <>
                    <li>
                        <Link href="/add-room" className={navStyle}>
                            <FaPlusCircle />
                            Add Room
                        </Link>
                    </li>

                    <li>
                        <Link href="/my-listings" className={navStyle}>
                            <FaClipboardList />
                            My Listings
                        </Link>
                    </li>

                    <li>
                        <Link href="/my-bookings" className={navStyle}>
                            <FaBookOpen />
                            My Bookings
                        </Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-black backdrop-blur border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/St.png"
                            alt="logo"
                            width={170}
                            height={60}
                            priority
                            className="object-contain w-[140px] sm:w-[160px] md:w-[170px] h-auto"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden lg:flex items-center gap-8 font-medium">
                        {navLinks}
                    </ul>

                    {/* Right Side */}
                    <div className="hidden lg:flex items-center gap-4">

                        {/* Theme Switcher */}
                        <ThemeSwitch></ThemeSwitch>

                        {!user ? (
                            <>
                                <Link
                                    href="/login"
                                    className={buttonStyle}
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className={buttonStyle}
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
                                        className="rounded-full object-cover border-2 border-black dark:border-white w-11 h-11"
                                    />

                                    <div className="text-left">
                                        <h3 className="font-semibold text-black dark:text-white">
                                            {user?.displayName || "User"}
                                        </h3>

                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Welcome Back
                                        </p>
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[100] menu p-3 shadow-lg bg-white dark:bg-black rounded-2xl w-60 mt-4 border border-gray-200 dark:border-gray-700"
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

                    {/* Mobile Right */}
                    <div className="flex items-center gap-3 lg:hidden">

                        {/* Theme Switcher */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-white"
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>

                        {/* Mobile Menu */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-2xl text-black dark:text-white"
                        >
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 shadow-md">
                    <div className="px-5 py-5">

                        {user && (
                            <div className="flex items-center gap-3 mb-5 border-b border-gray-200 dark:border-gray-700 pb-4">
                                <Image
                                    src={
                                        user?.photoURL ||
                                        "https://i.ibb.co/4pDNDk1/avatar.png"
                                    }
                                    alt="user"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover border-2 border-black dark:border-white w-12 h-12"
                                />

                                <div>
                                    <h3 className="font-semibold text-black dark:text-white">
                                        {user?.displayName || "User"}
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        )}

                        <ul className="space-y-5 font-medium">
                            {navLinks}
                        </ul>

                        {!user ? (
                            <div className="flex flex-col gap-3 mt-6">
                                <Link
                                    href="/login"
                                    className={`${buttonStyle} text-center`}
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className={`${buttonStyle} text-center`}
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="mt-6 w-full py-3 rounded-md border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-medium flex items-center justify-center gap-2"
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
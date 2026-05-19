"use client";

import Link from "next/link";
import {
  FaBookOpen,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white text-black flex items-center justify-center text-2xl">
              <FaBookOpen />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                StudyNook
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                Study Room Booking
              </p>
            </div>
          </Link>

          <p className="mt-6 text-gray-400 leading-7 text-sm">
            Find peaceful and comfortable study rooms anytime.
            Book your perfect study space easily with StudyNook.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-3 text-[#f6b84c]">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Rooms
              </Link>
            </li>

            <li>
              <Link href="/add-room" className="hover:text-white transition">
                Add Room
              </Link>
            </li>

            <li>
              <Link href="/my-listings" className="hover:text-white transition">
                My Listings
              </Link>
            </li>

            <li>
              <Link href="/my-bookings" className="hover:text-white transition">
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Explore
          </h3>

          <ul className="space-y-3 text-[#f6b84c]">
            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Quiet Rooms
              </Link>
            </li>

            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Group Study
              </Link>
            </li>

            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Premium Space
              </Link>
            </li>

            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Featured Rooms
              </Link>
            </li>

            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Top Rated
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Contact
          </h3>

          <div className="space-y-4 text-[#f6b84c]">

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1" />
              <p>Dhaka, Bangladesh</p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope />
              <p>support@studynook.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt />
              <p>+880 1234-567890</p>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Copyright */}
          <p className="text-sm text-gray-400 text-center md:text-left">
            Copyright © 2026 StudyNook | All Rights Reserved
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-xl text-white">

            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[#f6b84c] transition"
            >
              <FaFacebookF />
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-[#f6b84c] transition"
            >
              <FaXTwitter />
            </Link>

            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-[#f6b84c] transition"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
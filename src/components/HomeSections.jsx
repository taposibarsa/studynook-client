"use client";

import { FaSearch, FaCalendarCheck, FaDoorOpen } from "react-icons/fa";

export default function HomeSections() {
  return (
    <>
      <section className="py-16 bg-[#FAE8CE] dark:bg-zinc-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: FaSearch,
                title: "Browse Rooms",
                text: "Search and filter study rooms by amenities, floor, and hourly rate.",
              },
              {
                icon: FaCalendarCheck,
                title: "Book a Slot",
                text: "Pick a date and hourly time slot. Total cost is calculated automatically.",
              },
              {
                icon: FaDoorOpen,
                title: "Study Peacefully",
                text: "Enjoy your reserved quiet space. Owners can list and manage their rooms.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="text-center p-8 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-zinc-700 shadow-md"
              >
                <Icon className="text-4xl mx-auto text-[#F59E0B] mb-4" />
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
            Why StudyNook?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
            StudyNook connects students with private library study rooms. List your
            own space to earn, or book a quiet room when you need to focus. Our
            smart booking system prevents double-booking so your slot is always
            guaranteed.
          </p>
        </div>
      </section>
    </>
  );
}

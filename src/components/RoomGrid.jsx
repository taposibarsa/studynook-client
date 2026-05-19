"use client";

import RoomCard from "./RoomCard";

export default function RoomGrid({ rooms }) {
  if (!rooms?.length) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400 py-16 text-lg">
        No rooms found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}

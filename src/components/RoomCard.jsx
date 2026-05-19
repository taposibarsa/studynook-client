"use client";

import Image from "next/image";
import Link from "next/link";

function truncate(text, max = 100) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export default function RoomCard({ room }) {
  const amenities = room.amenities || [];
  const visible = amenities.slice(0, 3);
  const extra = amenities.length - 3;

  return (
    <div className="flex flex-col h-full rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-52 w-full shrink-0">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-xl font-bold text-black dark:text-white">{room.name}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
          {truncate(room.description)}
        </p>
        <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {room.floor} � {room.capacity} people � ${room.hourlyRate}/hr
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {visible.map((a) => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full bg-[#FAE8CE] dark:bg-zinc-800 text-black dark:text-white"
            >
              {a}
            </span>
          ))}
          {extra > 0 && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300">
              +{extra} more
            </span>
          )}
        </div>
        <Link
          href={`/rooms/${room._id}`}
          className="mt-4 inline-block text-center border-2 border-black dark:border-white rounded-xl py-2 font-semibold text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

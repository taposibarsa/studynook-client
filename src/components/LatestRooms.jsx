"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import RoomGrid from "./RoomGrid";
import LoadingSpinner from "./LoadingSpinner";

export default function LatestRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/rooms/latest")
      .then(setRooms)
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white text-center mb-10">
          Available Study Rooms
        </h2>
        {loading ? <LoadingSpinner /> : <RoomGrid rooms={rooms} />}
      </div>
    </section>
  );
}

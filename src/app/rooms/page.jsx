"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import RoomGrid from "@/components/RoomGrid";
import AmenityFilter from "@/components/AmenityFilter";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AllRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (amenities.length) params.set("amenities", amenities.join(","));
      if (minRate) params.set("minRate", minRate);
      if (maxRate) params.set("maxRate", maxRate);
      const qs = params.toString();
      const data = await apiFetch(`/api/rooms${qs ? `?${qs}` : ""}`);
      setRooms(data);
    } catch {
      setRooms([]);
    } finally {
      setLoading(false);
    }
  }, [search, amenities, minRate, maxRate]);

  useEffect(() => {
    const t = setTimeout(fetchRooms, 300);
    return () => clearTimeout(t);
  }, [fetchRooms]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl font-bold text-black dark:text-white text-center mb-10">
        Available Rooms
      </h1>
      <div className="mb-8 space-y-4 p-6 rounded-2xl bg-[#FAE8CE] dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
        <input
          type="search"
          placeholder="Search by room name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-black dark:text-white"
        />
        <AmenityFilter selected={amenities} onChange={setAmenities} />
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <input
            type="number"
            placeholder="Min rate ($)"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-black dark:text-white"
          />
          <input
            type="number"
            placeholder="Max rate ($)"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            className="rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-black dark:text-white"
          />
        </div>
      </div>
      {loading ? <LoadingSpinner /> : <RoomGrid rooms={rooms} />}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { TIME_SLOTS } from "@/lib/constants";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

function parseHour(t) {
  return parseInt(t.split(":")[0], 10);
}

export default function BookingModal({ room, open, onClose, onSuccess }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const endOptions = TIME_SLOTS.filter((t) => parseHour(t) > parseHour(startTime));
  const hours = parseHour(endTime) - parseHour(startTime);
  const totalCost = hours > 0 ? hours * room.hourlyRate : 0;

  useEffect(() => {
    if (endOptions.length && !endOptions.includes(endTime)) {
      setEndTime(endOptions[0]);
    }
  }, [startTime, endOptions, endTime]);

  if (!open) return null;

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          roomId: room._id,
          date,
          startTime,
          endTime,
          note,
        }),
      });
      toast.success("Room booked successfully!");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-gray-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          Book {room.name}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">
              Date
            </label>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-black dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-black dark:text-white">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-black dark:text-white"
              >
                {TIME_SLOTS.slice(0, -1).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-black dark:text-white">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-black dark:text-white"
              >
                {endOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-lg font-semibold text-[#F59E0B]">
            Total Cost: ${totalCost}
          </p>
          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">
              Special Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-black dark:text-white"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border-2 border-gray-300 dark:border-zinc-600 text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !date || hours < 1}
              className="flex-1 py-2 rounded-xl bg-[#F59E0B] border-2 border-black font-semibold text-black hover:bg-black hover:text-white transition disabled:opacity-50"
            >
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

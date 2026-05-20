"use client";

import ExternalImage from "@/components/ExternalImage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import LoadingSpinner from "@/components/LoadingSpinner";
import ConfirmModal from "@/components/ConfirmModal";
import { apiFetch } from "@/lib/api";

function canCancel(booking) {
  if (booking.status !== "confirmed") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(booking.date + "T00:00:00");
  return d >= today;
}

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const load = () => {
    setLoading(true);
    apiFetch("/api/bookings/mine")
      .then(setBookings)
      .catch((err) => {
        setBookings([]);
        toast.error(err.message || "Could not load your bookings");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async () => {
    try {
      await apiFetch(`/api/bookings/${cancelling._id}/cancel`, {
        method: "PATCH",
      });
      toast.success("Booking cancelled");
      setCancelling(null);
      load();
    } catch (err) {
      toast.error(err.message || "Cancel failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-10">
        My Bookings
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 py-16 text-lg">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md"
            >
              {b.room?.image && (
                <div className="relative w-full sm:w-40 h-32 shrink-0 rounded-xl overflow-hidden">
                  <ExternalImage src={b.room.image} alt={b.room.name} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-black dark:text-white">
                  {b.room?.name || "Room"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {b.date} · {b.startTime} – {b.endTime}
                </p>
                <p className="text-[#F59E0B] font-semibold mt-1">${b.totalCost}</p>
                <span
                  className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${
                    b.status === "confirmed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              {canCancel(b) && (
                <button
                  type="button"
                  onClick={() => setCancelling(b)}
                  className="self-start px-4 py-2 rounded-lg border-2 border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white transition"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <ConfirmModal
        open={!!cancelling}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking?"
        confirmLabel="Cancel Booking"
        onConfirm={handleCancel}
        onCancel={() => setCancelling(null)}
      />
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}

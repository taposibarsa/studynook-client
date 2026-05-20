"use client";

import ExternalImage from "@/components/ExternalImage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import BookingModal from "@/components/BookingModal";
import RoomForm from "@/components/RoomForm";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";

export default function RoomDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookOpen, setBookOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const loadRoom = () => {
    setLoading(true);
    apiFetch(`/api/rooms/${id}`)
      .then(setRoom)
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) loadRoom();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await apiFetch(`/api/rooms/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("Room updated successfully");
      setEditOpen(false);
      loadRoom();
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/rooms/${id}`, { method: "DELETE" });
      toast.success("Room deleted successfully");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (loading || authLoading) return <LoadingSpinner fullScreen />;

  if (!room) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 dark:text-gray-400">Room not found.</p>
        <Link href="/rooms" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to rooms
        </Link>
      </div>
    );
  }

  const isOwner = room.isOwner;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="relative h-80 lg:h-[28rem] rounded-2xl overflow-hidden">
          <ExternalImage src={room.image} alt={room.name} fill className="object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-black dark:text-white">{room.name}</h1>
          <p className="mt-2 text-[#F59E0B] font-semibold">
            {room.bookingCount ?? 0} bookings · ${room.hourlyRate}/hr
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">{room.description}</p>
          <p className="mt-4 text-black dark:text-white font-medium">
            {room.floor} · Capacity: {room.capacity} people
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(room.amenities || []).map((a) => (
              <span key={a} className="text-sm px-3 py-1 rounded-full bg-[#FAE8CE] dark:bg-zinc-800">
                {a}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {user ? (
              <button
                type="button"
                onClick={() => setBookOpen(true)}
                className="border-2 border-black dark:border-white bg-[#F59E0B] px-8 py-3 rounded-xl font-semibold text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
              >
                Book Now
              </button>
            ) : (
              <Link
                href={`/login?next=/rooms/${id}`}
                className="border-2 border-black dark:border-white bg-[#F59E0B] px-8 py-3 rounded-xl font-semibold text-black hover:bg-black hover:text-white transition"
              >
                Login to Book
              </Link>
            )}
            {isOwner && (
              <>
                <button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  className="px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="px-6 py-3 rounded-xl border-2 border-red-600 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <BookingModal
        room={room}
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        onSuccess={loadRoom}
      />

      {editOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Edit Room</h2>
            <RoomForm initial={room} onSubmit={handleUpdate} submitLabel="Update Room" />
            <button type="button" onClick={() => setEditOpen(false)} className="mt-4 text-gray-600 hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        open={deleteOpen}
        title="Delete Room"
        message="Are you sure you want to permanently delete this room?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import RoomGrid from "@/components/RoomGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import RoomForm from "@/components/RoomForm";
import ConfirmModal from "@/components/ConfirmModal";
import { apiFetch } from "@/lib/api";

function MyListingsContent() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    apiFetch("/api/rooms/mine")
      .then(setRooms)
      .catch((err) => {
        setRooms([]);
        toast.error(err.message || "Could not load your listings");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleUpdate = async (data) => {
    try {
      await apiFetch(`/api/rooms/${editing._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      toast.success("Room updated successfully");
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await apiFetch(`/api/rooms/${deleting._id}`, { method: "DELETE" });
      toast.success("Room deleted successfully");
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-4xl font-bold text-black dark:text-white">My Listings</h1>
        <Link
          href="/add-room"
          className="border-2 border-black dark:border-white bg-[#F59E0B] px-6 py-2 rounded-xl font-semibold text-black hover:bg-black hover:text-white transition"
        >
          Add New Room
        </Link>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400 py-16">
          You have not listed any rooms yet.
        </p>
      ) : (
        <div className="space-y-6">
          <RoomGrid rooms={rooms} />
          <div className="flex flex-wrap gap-3 justify-center">
            {rooms.map((room) => (
              <div key={room._id} className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(room)}
                  className="px-4 py-2 text-sm rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Edit {room.name}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleting(room)}
                  className="px-4 py-2 text-sm rounded-lg border border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Edit {editing.name}</h2>
            <RoomForm initial={editing} onSubmit={handleUpdate} submitLabel="Save Changes" />
            <button type="button" onClick={() => setEditing(null)} className="mt-4 text-gray-500 hover:underline">
              Cancel
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleting}
        title="Delete Room"
        message={`Delete "${deleting?.name}" permanently?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListingsContent />
    </PrivateRoute>
  );
}

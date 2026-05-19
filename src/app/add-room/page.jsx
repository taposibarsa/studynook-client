"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import RoomForm from "@/components/RoomForm";
import { apiFetch } from "@/lib/api";

function AddRoomContent() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await apiFetch("/api/rooms", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("Room added successfully");
      router.push("/my-listings");
    } catch (err) {
      toast.error(err.message || "Failed to add room");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-10">
        Add a Study Room
      </h1>
      <RoomForm onSubmit={handleSubmit} submitLabel="Add Room" />
    </div>
  );
}

export default function AddRoomPage() {
  return (
    <PrivateRoute>
      <AddRoomContent />
    </PrivateRoute>
  );
}

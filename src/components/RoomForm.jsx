"use client";

import { AMENITIES } from "@/lib/constants";

const inputClass =
  "w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500";

export default function RoomForm({
  initial = {},
  onSubmit,
  submitLabel = "Save Room",
}) {
  const amenities = initial.amenities || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const selected = AMENITIES.filter((a) =>
      form.querySelector(`[name="amenity-${a}"]`)?.checked
    );

    onSubmit({
      name: form.name.value,
      description: form.description.value,
      image: form.image.value,
      floor: form.floor.value,
      capacity: Number(form.capacity.value),
      hourlyRate: Number(form.hourlyRate.value),
      amenities: selected,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
      <div>
        <label className="block mb-2 font-medium text-black dark:text-white">
          Room Name
        </label>
        <input
          name="name"
          required
          defaultValue={initial.name || ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-black dark:text-white">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={4}
          defaultValue={initial.description || ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block mb-2 font-medium text-black dark:text-white">
          Image URL
        </label>
        <input
          name="image"
          required
          defaultValue={initial.image || ""}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 font-medium text-black dark:text-white">
            Floor
          </label>
          <input
            name="floor"
            required
            defaultValue={initial.floor || ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-black dark:text-white">
            Capacity
          </label>
          <input
            name="capacity"
            type="number"
            min={1}
            required
            defaultValue={initial.capacity || ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-black dark:text-white">
            Hourly Rate ($)
          </label>
          <input
            name="hourlyRate"
            type="number"
            min={1}
            required
            defaultValue={initial.hourlyRate || ""}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="block mb-3 font-medium text-black dark:text-white">
          Amenities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {AMENITIES.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={`amenity-${a}`}
                defaultChecked={amenities.includes(a)}
                className="accent-[#F59E0B]"
              />
              {a}
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full border-2 border-black dark:border-white bg-[#F59E0B] text-black font-semibold py-3 rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        {submitLabel}
      </button>
    </form>
  );
}

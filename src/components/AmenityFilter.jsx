"use client";

import { AMENITIES } from "@/lib/constants";

export default function AmenityFilter({ selected, onChange }) {
  const toggle = (amenity) => {
    if (selected.includes(amenity)) {
      onChange(selected.filter((a) => a !== amenity));
    } else {
      onChange([...selected, amenity]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {AMENITIES.map((amenity) => (
        <label
          key={amenity}
          className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white"
        >
          <input
            type="checkbox"
            checked={selected.includes(amenity)}
            onChange={() => toggle(amenity)}
            className="w-4 h-4 accent-[#F59E0B]"
          />
          {amenity}
        </label>
      ))}
    </div>
  );
}

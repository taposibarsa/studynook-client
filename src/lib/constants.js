export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export const TIME_SLOTS = [];
for (let h = 8; h <= 20; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
}

export const buttonPrimary =
  "border-2 bg-[#F59E0B] border-black dark:border-white text-black text-lg dark:text-white px-8 py-3 rounded-xl font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300";

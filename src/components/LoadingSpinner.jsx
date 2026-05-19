"use client";

export default function LoadingSpinner({
  fullScreen = false,
  label = "Loading...",
}) {
  const wrapper = fullScreen
    ? "min-h-[50vh] flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center py-16";

  return (
    <div className={wrapper}>
      <div
        className="w-12 h-12 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
      <p className="mt-4 text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}

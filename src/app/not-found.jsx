import Link from "next/link";

export const metadata = {
  title: "StudyNook – Page Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#F59E0B]">404</h1>
      <h2 className="text-2xl font-bold text-black dark:text-white mt-4">
        Page not found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 border-2 border-black dark:border-white bg-[#F59E0B] px-8 py-3 rounded-xl font-semibold text-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

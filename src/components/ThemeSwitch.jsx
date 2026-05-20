"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-1 shadow-md w-fit h-10 min-w-[4.5rem] transition-all duration-300"
      aria-hidden={!mounted}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
          mounted && !isDark
            ? "text-white bg-black shadow-md scale-105"
            : "text-gray-500 hover:text-yellow-500"
        }`}
      >
        <BsSunFill className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
          isDark
            ? "bg-white text-black shadow-md scale-105"
            : "text-gray-500 hover:text-cyan-500"
        }`}
      >
        <FaMoon className="size-4" />
      </button>
    </div>
  );
};

export default ThemeSwitch;

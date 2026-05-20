"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const inputClass =
  "w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 pr-12 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-[#F59E0B] transition-all duration-300";

export default function PasswordInput({
  name = "password",
  placeholder = "Enter your password",
  required = true,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        required={required}
        placeholder={placeholder}
        className={inputClass}
        autoComplete={name === "password" ? "current-password" : "new-password"}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F59E0B] transition-colors text-lg"
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password Validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError(
        "Password must contain at least one uppercase letter."
      );
    }

    if (!/[a-z]/.test(password)) {
      return setError(
        "Password must contain at least one lowercase letter."
      );
    }

    // Registration logic here
    console.log({
      name,
      email,
      photo,
      password,
    });

    // Success example
    // toast.success("Registration successful! Please login.");
    // router.push("/login");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4 py-15 mt-10 transition-colors duration-300">
      
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-10 border border-gray-200 dark:border-zinc-800">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Create Account
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Register your new account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Photo URL
            </label>

            <input
              type="text"
              name="photo"
              required
              placeholder="Enter your photo URL"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />

            {/* Password Rules */}
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Minimum 6 characters</p>
              <p>• At least one uppercase letter</p>
              <p>• At least one lowercase letter</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-xl text-black text-xl border-black border-2 hover:bg-black hover:text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700"></div>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            OR
          </span>

          <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700"></div>
        </div>

        {/* Google Button */}
        <button
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 font-medium text-gray-700 dark:text-white dark:hover:bg-zinc-700 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <FcGoogle className="text-2xl" />

          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-[16px] text-gray-600 dark:text-gray-400 mt-8">
          Already have an account?{" "}

          <Link
            href="/login"
            className="text-blue-600 text-lg hover:font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4 py-15 mt-10 transition-colors duration-300">
      
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-10 border border-gray-200 dark:border-zinc-800">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2  [16px] font-medium text-gray-b00 dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl text-black text-xl border-black border-2  hover:bg-black hover:text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30"
          >
            Login
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
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 font-medium text-gray-700 dark:text-white  dark:hover:bg-zinc-700 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <FcGoogle className="text-2xl" />

          Sign in with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-[16px] text-gray-600 dark:text-gray-400 mt-8">
          Don&apos;t have an account?{" "}
          
          <Link
            href="/register"
            className="text-blue-600 text-lg  hover:font-bold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
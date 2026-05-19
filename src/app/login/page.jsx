"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useAuth, googleLogin } from "@/context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    try {
      await login(form.email.value, form.password.value);
      toast.success("Welcome back!");
      router.push(next);
    } catch (err) {
      toast.error(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4 py-15 mt-10 transition-colors duration-300">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-10 border border-gray-200 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-[16px] font-medium text-gray-800 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl text-black text-xl border-black border-2 hover:bg-black hover:text-white font-semibold py-3 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
        </div>
        <button
          type="button"
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 font-medium text-gray-700 dark:text-white hover:bg-black hover:text-white transition"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <p className="text-center text-[16px] text-gray-600 dark:text-gray-400 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 text-lg hover:font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

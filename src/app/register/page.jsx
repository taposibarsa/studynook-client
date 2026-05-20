"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useAuth, googleLogin } from "@/context/AuthContext";
import PasswordInput from "@/components/PasswordInput";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoUrl = form.photo.value;
    const password = form.password.value;

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }

    setLoading(true);
    try {
      await register({ name, email, photoUrl, password });
      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 dark:bg-zinc-950 px-4 py-15 mt-10">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl p-10 border border-gray-200 dark:border-zinc-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Register your new account</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-300">Full Name</label>
            <input type="text" name="name" required className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-300">Email Address</label>
            <input type="email" name="email" required className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-300">Photo URL</label>
            <input type="url" name="photo" required placeholder="https://..." className="w-full rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-300">Password</label>
            <PasswordInput placeholder="Create a password" />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl text-black text-xl border-black border-2 hover:bg-black hover:text-white font-semibold py-3 transition disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300 dark:bg-zinc-700" />
        </div>
        <button
          type="button"
          disabled={googleLoading}
          onClick={async () => {
            setGoogleLoading(true);
            try {
              await googleLogin("/");
            } catch (err) {
              toast.error(err.message || "Google sign-in failed");
              setGoogleLoading(false);
            }
          }}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 dark:border-zinc-700 py-3 font-medium hover:bg-black hover:text-white transition disabled:opacity-50"
        >
          <FcGoogle className="text-2xl" />
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Already have an account? <Link href="/login" className="text-blue-600 hover:font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

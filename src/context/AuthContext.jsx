"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Navbar from "@/components/Navbar";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email, password) => {
    const data = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(data.user);
    return data.user;
  };

  const register = async ({ name, email, photoUrl, password }) => {
    await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, photoUrl, password }),
    });
  };

  const logout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setUser(null);
  };

  const navUser = user
    ? {
        displayName: user.name,
        email: user.email,
        photoURL: user.photoUrl,
        _id: user._id,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      <Navbar user={navUser} handleLogout={logout} loading={loading} />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Browser redirect via client proxy so auth cookies stay on the app origin. */
export function googleLogin() {
  window.location.href = "/api/backend/auth/google";
}

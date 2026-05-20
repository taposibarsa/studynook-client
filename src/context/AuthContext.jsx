"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";

const AuthContext = createContext(null);

function mapBetterAuthUser(user) {
  if (!user) return null;
  return {
    _id: user.id,
    name: user.name,
    email: user.email,
    photoUrl: user.image || user.photoUrl || "",
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      if (session?.user) {
        setUser(mapBetterAuthUser(session.user));
        return;
      }

      try {
        const data = await apiFetch("/api/auth/me");
        setUser(data.user);
      } catch {
        setUser(null);
      }
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
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) {
      throw new Error(error.message || "Invalid email or password");
    }
    const mapped = mapBetterAuthUser(data?.user);
    setUser(mapped);
    return mapped;
  };

  const register = async ({ name, email, photoUrl, password }) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      photoUrl,
      image: photoUrl,
    });
    if (error) {
      throw new Error(error.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {
      /* ignore */
    }
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
        photoURL: user.photoUrl || user.image,
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

export async function googleLogin(callbackURL = "/") {
  await authClient.signIn.social({
    provider: "google",
    callbackURL,
    errorCallbackURL: "/login",
  });
}

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!user) {
    return <LoadingSpinner fullScreen />;
  }

  return children;
}

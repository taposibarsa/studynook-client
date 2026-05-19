"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import NextThemeProvider from "@/providers/NextThemeProvider";

export default function Providers({ children }) {
  return (
    <NextThemeProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-right" />
      </AuthProvider>
    </NextThemeProvider>
  );
}

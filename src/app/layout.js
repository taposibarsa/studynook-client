import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "StudyNook – Home",
  icons: {
    icon: "/favicon.png",
  },
  description: "Library Study Room Booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className={`${roboto.className} min-h-full flex flex-col bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}

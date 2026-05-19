import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextThemeProvider from "@/providers/NextThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook",
  icons: {
    icon: "/favicon.png",
  },
  description: "Library Study Room Booking",
};
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight:["400", "500", "600", "700", "800"]
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${roboto.className} min-h-full flex flex-col  bg-background text-foreground`}>

        <NextThemeProvider>
          <Navbar />
        {children}
        <Footer />
        </NextThemeProvider>

      </body>  
    </html>
  );
}

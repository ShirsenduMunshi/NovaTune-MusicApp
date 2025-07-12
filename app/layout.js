import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import MusicPlayer from "@/components/MusicPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NovaTune || Music Player",
  description: "NovaTune is a modern music player built with Next.js and React.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         <MusicPlayerProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>
              {children}
              <MusicPlayer />
            </main>
            <Footer/>
          </ThemeProvider>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}

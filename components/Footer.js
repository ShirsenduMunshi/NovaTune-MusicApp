"use client";
import Link from "next/link";
import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-border bg-background/80 backdrop-blur text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 grid-cols-1 gap-10 text-center md:text-left">
        
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center mb-3">
            <img src="/logo.png" alt="NovaTune Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">NovaTune</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">
            A universe of sound. Discover and enjoy music from across the galaxy.
          </p>
        </div>

        {/* Explore */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/discover" className="hover:text-primary">Discover</Link></li>
            <li><Link href="/playlists" className="hover:text-primary">Playlists</Link></li>
            <li><Link href="/galaxy" className="hover:text-primary">Galaxy</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/support" className="hover:text-primary">Support</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Connect</h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <Link href="https://github.com/shirsendumunshi" className="hover:text-primary" target="_blank" rel="noreferrer"><FaGithub /></Link>
            <Link href="https://x.com/MunshiShirsendu" className="hover:text-primary" target="_blank" rel="noreferrer"><FaTwitter /></Link>
            <Link href="https://www.instagram.com/munshirudra/?utm_source=qr&igsh=MWx2YWNweTA5dWJjcw%3D%3D#" className="hover:text-primary" target="_blank" rel="noreferrer"><FaInstagram /></Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-muted-foreground py-4 border-t border-border">
        © {new Date().getFullYear()} NovaTune. Built with <span className="text-red-500">❤️</span> by Shirsendu.
      </div>
    </footer>
  );
}


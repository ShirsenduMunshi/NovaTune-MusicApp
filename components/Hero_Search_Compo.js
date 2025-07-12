// components/HeroSection.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search.trim() !== "") {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="w-full px-4 py-12 md:py-20 bg-[#1447e633] rounded-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text + Search + Buttons */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground ml-5">
            Welcome to <span className="text-primary">NovaTune</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md ml-5 text-wrap">
            Dive into a universe of sound. Discover new music, artists, and vibes across the galaxy ✨
          </p>

          {/* Search Bar */}
          <div className="flex items-center gap-2 max-w-md ml-5">
            <Input
              type="text"
              placeholder="Search for songs, artists, or albums..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button variant="default" onClick={handleSearch} className="mr-5">Search</Button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Link href="/discover"><Button size="lg">🎧 Browse Music</Button></Link>
            <Link href="/galaxy"><Button size="lg" variant="secondary">
              🚀 Explore Galaxy
            </Button></Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src="/creator-sign.png"
            alt="NovaTune Music Illustration"
            className="w-full hidden md:block max-w-md mx-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

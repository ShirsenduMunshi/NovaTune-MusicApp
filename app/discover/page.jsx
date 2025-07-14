"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Link from "next/link";

const discoverCategories = [
  { title: "Top Hindi", image: "/MusicBannerImage.jpg", id: "top-hindi" },
  { title: "Lo-Fi Chill", image: "/MusicBannerImage.jpg", id: "lofi-chill" },
  { title: "Workout Boost", image: "/MusicBannerImage.jpg", id: "workout-boost" },
  { title: "Classical Fusion", image: "/MusicBannerImage.jpg", id: "classical-fusion" },
  { title: "Pop Vibes", image: "/MusicBannerImage.jpg", id: "pop-vibes" },
  { title: "Indie Gems", image: "/MusicBannerImage.jpg", id: "indie-gems" },
];

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Heading with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold">🔍 Discover New Sounds</h1>
        <p className="text-muted-foreground text-sm">
          Explore trending genres, moods, and curated playlists to match every vibe.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.form
        onSubmit={handleSearch}
        className="max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Input
          placeholder="Search genres, moods, artists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.form>

      {/* Category Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border shadow-sm">
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {discoverCategories.map((item, idx) => (
            <Link href={`/search/${item.id}`} key={idx} className="group">
              <motion.div
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow hover:shadow-md transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Button variant="secondary" size="icon">
                  <PlayCircle className="w-6 h-6" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground">Discover more</p>
              </div>
            </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </main>
  );
}
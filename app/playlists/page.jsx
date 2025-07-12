"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const dummyPlaylists = [
  {
    title: "Chill Beats",
    songs: 24,
    creator: "Nova",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Hindi Melodies",
    songs: 15,
    creator: "Arjun",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Workout Mix",
    songs: 30,
    creator: "Rhea",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Focus Study",
    songs: 18,
    creator: "Zen Mode",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Lo-Fi Nights",
    songs: 20,
    creator: "Chillzone",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Rock Arena",
    songs: 32,
    creator: "Rocky",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Soft Soul",
    songs: 12,
    creator: "Ava",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "EDM Madness",
    songs: 45,
    creator: "NovaDJ",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Romantic Rhythms",
    songs: 22,
    creator: "Aria",
    cover: "/MusicBannerImage.jpg",
  },
  {
    title: "Coding Focus",
    songs: 16,
    creator: "DevLoop",
    cover: "/MusicBannerImage.jpg",
  },
];

export default function PlaylistsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => setLoading(false), 1000); // simulate fetch
    return () => clearTimeout(delay);
  }, []);

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 bg-[#1447e633] p-2 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold">🎶 Featured Playlists</h1>
        <p className="text-sm text-muted-foreground">
          Curated collections for every vibe and moment.
        </p>
      </motion.div>

      {/* Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-border bg-card shadow-sm"
            >
              <Skeleton className="w-full h-40" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-2 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {dummyPlaylists.map((list, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <img
                src={list.cover}
                alt={list.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate">
                  {list.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {list.songs} Songs
                </p>
                <p className="text-xs mt-1 text-muted-foreground">
                  By {list.creator}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </main>
  );
}


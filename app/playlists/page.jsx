"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const dummyPlaylists = [
  {
    title: "Chill Beats",
    songs: 24,
    creator: "Nova",
    cover: "/playlists/chill.jpg",
  },
  {
    title: "Hindi Melodies",
    songs: 15,
    creator: "Arjun",
    cover: "/playlists/hindi.jpg",
  },
  {
    title: "Workout Mix",
    songs: 30,
    creator: "Rhea",
    cover: "/playlists/workout.jpg",
  },
  {
    title: "Focus Study",
    songs: 18,
    creator: "Zen Mode",
    cover: "/playlists/focus.jpg",
  },
];

export default function PlaylistsPage() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🎧 Your Playlists</h1>
        <Button variant="outline" className="flex gap-2 items-center">
          <PlusCircle className="w-5 h-5" />
          Create New
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyPlaylists.map((list, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition"
          >
            <img src={list.cover} alt={list.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold truncate">{list.title}</h2>
              <p className="text-sm text-muted-foreground">{list.songs} Songs</p>
              <p className="text-xs mt-1 text-muted-foreground">By {list.creator}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

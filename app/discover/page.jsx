"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle } from "lucide-react";

const discoverCategories = [
  { title: "Top Hindi", image: "/discover/hindi.jpg" },
  { title: "Lo-Fi Chill", image: "/discover/lofi.jpg" },
  { title: "Workout Boost", image: "/discover/workout.jpg" },
  { title: "Classical Fusion", image: "/discover/classical.jpg" },
  { title: "Pop Vibes", image: "/discover/pop.jpg" },
  { title: "Indie Gems", image: "/discover/indie.jpg" },
];

export default function DiscoverPage() {
  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">🔍 Discover New Sounds</h1>

      <div className="mb-6">
        <Input placeholder="Search genres, moods, artists..." className="max-w-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {discoverCategories.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow hover:shadow-md transition-all"
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
          </div>
        ))}
      </div>
    </main>
  );
}

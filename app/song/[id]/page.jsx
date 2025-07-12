"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SongDetailPage({ params }) {
  const [song, setSong] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("selectedSong");
    if (stored) {
      setSong(JSON.parse(stored));
    } else {
      // Handle refresh fallback
      router.replace("/"); // Or navigate to a safe default page
    }
  }, [router]);

  if (!song) {
    return <div className="text-center py-10">Loading song...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-8 space-y-6">
      <img
        src={song.banner}
        alt={song.title}
        className="rounded-xl w-full max-h-[300px] object-cover"
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{song.title}</h1>
        <p className="text-muted-foreground">By {song.artist}</p>
        <p className="text-sm text-muted-foreground">{song.description}</p>
      </div>

      <audio controls className="w-full mt-4 rounded-lg">
        <source src={song.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

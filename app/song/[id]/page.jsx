"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

export default function SongDetailPage({ params }) {
  const [song, setSong] = useState(null);
  const router = useRouter();
  const { setCurrentSong } = useMusicPlayer();

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

  const handlePlay = () => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      src: song.audio,
      cover: song.banner,
    });
  };

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

      <Button onClick={handlePlay} className="mt-4 flex items-center gap-2">
        <Play className="w-5 h-5" />
        Play Now
      </Button>

      <div className="text-muted text-sm italic mt-2">
        Use the global player below to control playback
      </div>
    </div>
  );
}

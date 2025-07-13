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
      try {
        const parsed = JSON.parse(stored);
        setSong(parsed);
      } catch (e) {
        console.error("Failed to parse song from localStorage:", e);
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!song) {
    return <div className="text-center py-10">Loading song...</div>;
  }

  // Extract info safely
  const title = song.name || song.title || "Untitled";
  const album = song.album?.name || "Unknown Album";
  const artistList = song.artists?.primary?.map((a) => a.name).join(", ") || "Unknown Artist";
  const language = song.language || "Unknown";
  const playCount = song.playCount ? song.playCount.toLocaleString() : "N/A";
  const label = song.label || "Unknown Label";
  const copyright = song.copyright || "";
  const releaseYear = song.year || "Unknown";
  const durationSec = song.duration || 0;
  const durationMin = `${Math.floor(durationSec / 60)}:${String(durationSec % 60).padStart(2, "0")}`;
  const cover =
    song.banner || song.image?.[2]?.url || song.image?.[0]?.url || "";

  // Find best quality audio (320 > 160 > 96...)
  const audio =
    song.downloadUrl?.find((d) => d.quality === "320kbps")?.url ||
    song.downloadUrl?.[0]?.url ||
    song.url ||
    song.audio;

  const handlePlay = () => {
    setCurrentSong({
      title,
      artist: artistList,
      src: audio,
      cover,
    });
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-8 space-y-6">
      {/* Cover Image */}
      {cover ? (
        <img
          src={cover}
          alt={title}
          className="rounded-xl w-full max-h-[300px] object-cover"
        />
      ) : (
        <div className="h-[300px] w-full rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          No Image Available
        </div>
      )}

      {/* Song Details */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">By {artistList}</p>
        <p className="text-sm text-muted-foreground">
          Album: <span className="font-medium">{album}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Duration: <span className="font-medium">{durationMin} min</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Language: <span className="font-medium">{language}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Play Count: <span className="font-medium">{playCount}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Label: <span className="font-medium">{label}</span>
        </p>
        <p className="text-xs text-muted-foreground italic mt-2">
          {copyright} | © {releaseYear}
        </p>
      </div>

      {/* Play Button */}
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

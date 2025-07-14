"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function PlaylistDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { setCurrentSong } = useMusicPlayer();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("selectedPlaylist");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.id === params.id) {
        setPlaylist(parsed);
      } else {
        router.push("/playlists");
      }
    } else {
      router.push("/playlists");
    }
  }, [params.id, router]);

  const handlePlaySong = (song) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      src: "/sample.mp3", // Replace with dynamic song URL later
      cover: playlist.cover,
    });
  };

  if (!playlist) return <p className="text-center py-10">Loading...</p>;

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="w-24 h-24 rounded-md object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{playlist.title}</h1>
          <p className="text-sm text-muted-foreground">By {playlist.creator}</p>
        </div>
      </div>

      <div className="space-y-4">
        {playlist.songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-muted rounded-md hover:bg-muted/70 transition-all"
          >
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handlePlaySong(song)}
              aria-label="Play Song"
            >
              <Play className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}

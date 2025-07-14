"use client";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SuggestedSongs() {
  const [artistId, setArtistId] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentSong } = useMusicPlayer();

  useEffect(() => {
    const stored = localStorage.getItem("recentlyPlayed");
    if (!stored) return;

    try {
      const songData = JSON.parse(stored);
      const primaryArtist = songData.artistId || songData?.artist?.id;
      if (primaryArtist) {
        setArtistId(primaryArtist);
      }
    } catch (err) {
      console.error("Invalid song data in localStorage", err);
    }
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!artistId) return;
      setLoading(true);
      try {
        const res = await fetch(`https://saavn.dev/api/artists/${artistId}/songs`);
        const json = await res.json();
        if (json.success && json.data?.songs?.length > 0) {
          setSongs(json.data.songs);
        } else {
          setSongs([]);
        }
      } catch (err) {
        console.error("Error fetching suggested songs:", err);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [artistId]);

  if (!artistId || songs.length === 0) return null;

  return (
    <div className="space-y-2 min-h-full">
      <div className="overflow-y-auto pr-1 space-y-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))
        ) : (
          songs.slice(0, 10).map((song, i) => (
            <Card
              key={i}
              className="flex items-center gap-3 p-2 cursor-pointer hover:shadow"
              onClick={() =>
                setCurrentSong({
                  title: song.name,
                  artist:
                    song.artists?.primary?.map((a) => a.name).join(", ") || "Unknown",
                  src:
                    song.downloadUrl?.find((d) => d.quality === "320kbps")?.url ||
                    song.url,
                  cover: song.image?.[2]?.url,
                  artistId: song.artists?.primary?.[0]?.id,
                })
              }
            >
              <img
                src={song.image?.[1]?.url || "/images/cover.jpg"}
                alt={song.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1">
                <CardTitle className="text-sm line-clamp-1">{song.name}</CardTitle>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {song.artists?.primary?.map((a) => a.name).join(", ")}
                </p>
              </div>
              <Play className="w-4 h-4 text-muted-foreground" />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Play } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { motion } from "framer-motion";

export default function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCurrentSong } = useMusicPlayer();

  useEffect(() => {
    async function fetchAlbumData() {
      try {
        const res = await fetch(`https://saavn.dev/api/albums/${id}`);
        const json = await res.json();
        if (json.success) {
          setAlbum(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch album", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchAlbumData();
  }, [id]);

  if (loading || !album) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Skeleton className="h-48 w-48 rounded mb-4" />
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-20 mb-6" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-6 items-center mb-6"
      >
        <img
          src={album.image?.[2]?.url || "/images/cover.jpg"}
          alt={album.name}
          className="w-48 h-48 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{album.name}</h1>
          <p className="text-sm text-muted-foreground">
            {album.primaryArtists?.map((a) => a.name).join(", ")}
          </p>
          <p className="text-sm text-muted-foreground">
            {album.songCount} Songs • {album.year}
          </p>
        </div>
      </motion.div>

      <Separator className="my-6" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid md:grid-cols-2 gap-4"
      >
        {album.songs.map((song, i) => (
          <Card
            key={i}
            className="flex items-center gap-4 p-3 cursor-pointer hover:shadow"
            onClick={() =>
              setCurrentSong({
                title: song.name,
                artist:
                  song.artists?.primary?.map((a) => a.name).join(", ") ||
                  "Unknown",
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
              className="w-12 h-12 object-cover rounded"
              alt={song.name}
            />
            <div className="flex-1">
              <CardTitle className="text-sm line-clamp-1">{song.name}</CardTitle>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {song.artists?.primary?.map((a) => a.name).join(", ")}
              </p>
            </div>
            <Play className="w-4 h-4 text-muted-foreground" />
          </Card>
        ))}
      </motion.div>
    </div>
  );
}

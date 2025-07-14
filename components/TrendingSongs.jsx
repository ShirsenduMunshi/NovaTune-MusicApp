"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function TrendingSongs() {
  const scrollRef = useRef(null);
  const router = useRouter();
  const { setCurrentSong } = useMusicPlayer();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      setLoading(true);
      try {
        const query = "trending hindi songs";
        const res = await fetch(`/api/saavan/search?query=${encodeURIComponent(query)}`);
        const json = await res.json();

        const allResults = json.results || json.data?.results || [];
        const songResults = allResults.filter((item) => item.type?.toLowerCase() === "song");

        setSongs(songResults);
      } catch (error) {
        console.error("Failed to fetch trending songs:", error);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSongs();
  }, []);

  const handlePlayClick = (e, song) => {
    e.stopPropagation();

    const primaryArtists = song.artists?.primary?.map((a) => a.name).join(", ") || song.artist;

    localStorage.setItem("selectedSong", JSON.stringify(song));

    setCurrentSong({
      title: song.name,
      artist: primaryArtists,
      src: song.downloadUrl?.find((d) => d.quality === "320kbps")?.url || song.url,
      cover: song.image?.[2]?.url,
      artistId: song.artists?.primary?.[0]?.id,
    });
  };

  const handleCardClick = (song) => {
    localStorage.setItem("selectedSong", JSON.stringify(song));
    router.push(`/song/${song.id}`);
  };

  return (
    <section className="mt-6 max-w-[90%] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🔥 Trending Songs</h2>
      </div>

      <div className="relative">
        <Button
          size="icon"
          variant="ghost"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex"
          onClick={() => scroll("right")}
        >
          <FaChevronRight className="w-5 h-5" />
        </Button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-40 h-56 rounded-lg" />
              ))
            : songs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => handleCardClick(song)}
                  className="cursor-pointer relative w-40 min-w-[160px] rounded-lg overflow-hidden bg-card shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={song.image?.[2]?.url || "/images/cover.jpg"}
                    alt={song.name}
                    className="w-full h-40 object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={(e) => handlePlayClick(e, song)}
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="p-2">
                    <h3 className="text-sm font-medium truncate">{song.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {song.artists?.primary?.map((a) => a.name).join(", ") || "Unknown Artist"}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

export default function MusicSlider({ title, query }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const router = useRouter();
  const { setCurrentSong } = useMusicPlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/saavan/search?query=${encodeURIComponent(query)}`);
        const json = await res.json();

        console.log(`Fetched songs for 🎵 ${title}:`, json);

        if (json.results && Array.isArray(json.results)) {
          const filtered = json.results.filter(item => item.type === "song");
          setSongs(filtered.slice(0, 10)); // Limit to 10 songs
        } else {
          setSongs([]);
        }
      } catch (error) {
        console.error(`Failed to fetch for ${title}:`, error);
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [query]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handlePlayClick = (e, song) => {
    e.stopPropagation();

    const primaryArtist = song?.artists?.primary?.map(a => a.name).join(", ") || song?.artist;

    const songObj = {
      title: song.name || song.title,
      artist: primaryArtist || "Unknown",
      src: song.downloadUrl?.find(d => d.quality === "320kbps")?.url || song.url,
      cover: song.image?.[2]?.url || "/images/cover.jpg",
      artistId: song.artists?.primary?.[0]?.id || null,
    };

    localStorage.setItem("recentlyPlayed", JSON.stringify(songObj));
    setCurrentSong(songObj);
  };

  const handleCardClick = (song) => {
    localStorage.setItem("selectedSong", JSON.stringify(song));
    router.push(`/song/${song.id}`);
  };

  return (
    <section className="mt-6 max-w-[90%] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
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
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-52 w-40 rounded-lg" />
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
                      {song.artists?.primary?.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

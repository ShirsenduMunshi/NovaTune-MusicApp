"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

const trendingSongs = [
  {
    id: "sahiba",
    title: "Sahiba",
    artist: "Aditya Rikhari",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "saiyaara",
    title: "Saiyaara (From 'Saiyaara')",
    artist: "Tanishk Bagchi, Faheem Abdullah, Arslan Nizami",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "at-peace",
    title: "At Peace",
    artist: "Karan Aujla, Ikky",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "ehsaas",
    title: "Ehsaas",
    artist: "Faheem Abdullah, Duha Shah",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "ranjha",
    title: "Ranjha",
    artist: "B Praak",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "qaafirana",
    title: "Qaafirana",
    artist: "Arijit Singh",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "closer",
    title: "Closer",
    artist: "The Chainsmokers",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "shape-of-you",
    title: "Shape of You",
    artist: "Ed Sheeran",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
  {
    id: "let-me-love-you",
    title: "Let Me Love You",
    artist: "DJ Snake, Justin Bieber",
    banner: "/MusicBannerImage.jpg",
    audio: "/sample.mp3",
  },
];

export default function TrendingSongs() {
  const scrollRef = useRef(null);
  const router = useRouter();
  const { setCurrentSong } = useMusicPlayer();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handlePlayClick = (e, song) => {
    e.stopPropagation(); // prevent navigation
    // 🔄 Set localStorage for page fallback
    localStorage.setItem("selectedSong", JSON.stringify(song));

    // 🔊 Trigger global player
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      src: song.audio,
      cover: song.banner,
    });
  };

  const handleCardClick = (song) => {
    localStorage.setItem("selectedSong", JSON.stringify(song)); // 💾 So song/[id] can access it
    router.push(`/song/${song.id}`);
  };

  return (
    <section className="mt-6">
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
          {trendingSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => handleCardClick(song)}
              className="cursor-pointer relative w-40 min-w-[160px] rounded-lg overflow-hidden bg-card shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={song.banner}
                alt={song.title}
                className="w-full h-40 object-cover"
              />

              {/* Hover Play Button */}
              <div
                className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => handlePlayClick(e, song)} // ✅ Play without navigating
                >
                  <Play className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-2">
                <h3 className="text-sm font-medium truncate">{song.title}</h3>
                <p className="text-xs text-muted-foreground truncate">
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

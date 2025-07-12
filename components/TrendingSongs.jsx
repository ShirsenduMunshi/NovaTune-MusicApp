"use client";
import { useRef } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const trendingSongs = [
  {
    title: "Sahiba",
    artist: "Aditya Rikhari",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Saiyaara (From 'Saiyaara')",
    artist: "Tanishk Bagchi, Faheem Abdullah, Arslan Nizami",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "At Peace",
    artist: "Karan Aujla, Ikky",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Ehsaas",
    artist: "Faheem Abdullah, Duha Shah",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Ranjha",
    artist: "B Praak",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Qaafirana",
    artist: "Arijit Singh",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Closer",
    artist: "The Chainsmokers",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
  {
    title: "Let Me Love You",
    artist: "DJ Snake, Justin Bieber",
    banner: "https://media.istockphoto.com/id/1280385511/photo/colorful-background.jpg?s=612x612&w=0&k=20&c=kj0PRQlgvWLzA1-1me6iZp5mlwsZhC4QlcvIEb1J1bs=",
  },
];

export default function TrendingSongs() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🔥 Trending Songs</h2>
      </div>

      <div className="relative">
        {/* Scroll Buttons */}
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

        {/* Songs Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {trendingSongs.map((song, index) => (
            <div
              key={index}
              className="relative w-40 min-w-[160px] rounded-lg overflow-hidden bg-card shadow-md hover:scale-105 transition-transform duration-300"
            >
              <img
                src={song.banner}
                alt={song.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <Button variant="secondary" size="icon">
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

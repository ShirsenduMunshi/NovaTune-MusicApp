"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const popularArtists = [
  {
    name: "Arijit Singh",
    role: "Artist",
    image: "https://static.wikia.nocookie.net/oggyandthecockroaches/images/b/b3/El_Salsafiore_Man.png/revision/latest?cb=20190412190026",
  },
  {
    name: "Shreya Ghoshal",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "The Weeknd",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "B Praak",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "Diljit Dosanjh",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "Neha Kakkar",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "Ed Sheeran",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "KK",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "Shankar Mahadevan",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
  {
    name: "Sunidhi Chauhan",
    role: "Artist",
    image: "https://assets.mycast.io/characters/el-salsafiore-79448463-normal.jpg?1722362232",
  },
];

export default function PopularArtists() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🎤 Popular Artists</h2>
        <button className="text-sm text-muted-foreground hover:text-primary transition">
          Show all
        </button>
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

        {/* Artists Row */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {popularArtists.map((artist, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[100px] max-w-[100px] text-center"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-20 h-20 object-cover rounded-full border border-border shadow-sm"
              />
              <h3 className="text-sm font-medium mt-2 truncate">{artist.name}</h3>
              <p className="text-xs text-muted-foreground">{artist.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

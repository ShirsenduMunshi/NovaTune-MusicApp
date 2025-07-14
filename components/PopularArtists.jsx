"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BadgeCheck, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";

const artistIds = [
  "1274170", // Dua Lipa
  "459320",  // Arijit Singh
  "455782",  // KK
  "464932",  // Neha Kakkar
  "455125",  // Sonu Nigam
  "881158",  // Jubin Nautiyal
  "456863",  // Badshah
  "464656",  // Armaan Malik
  "572559",  // A.R. Rahman
  "455129",  // Sunidhi Chauhan
  "455605",  // Atif Aslam
  "455126",  // Shreya Ghoshal
  "459563", // Vishal-Shekhar
  "461114", // Pritam || Amit Trivedi
  "455201", // Himesh Reshammiya || Alka Yagnik
  "455127", // Udit Narayan
];

export default function PopularArtists() {
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const results = await Promise.all(
          artistIds.map(async (id) => {
            const res = await fetch(`https://saavn.dev/api/artists/${id}`);
            const json = await res.json();

            if (!json.success || !json.data) return null;

            return {
              id,
              name: json.data.name,
              image: json.data.image?.[2]?.url || "/fallback.jpg",
              role: json.data.dominantType || json.data.type || "Artist",
              isVerified: json.data.isVerified || false,
              followers: json.data.followerCount,
            };
          })
        );

        const cleaned = results.filter(Boolean); // remove failed fetches
        setArtists(cleaned);
      } catch (err) {
        console.error("Failed to fetch artists:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-10 max-w-[90%] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🎤 Popular Artists</h2>
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

        {/* Artists */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
        >
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center min-w-[100px] max-w-[100px] text-center"
                >
                  <Skeleton className="w-20 h-20 rounded-full" />
                  <Skeleton className="w-16 h-4 mt-2" />
                  <Skeleton className="w-12 h-3 mt-1" />
                </div>
              ))
            : artists.map((artist, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[100px] max-w-[100px] text-center cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => router.push(`/artist/${artist.id}`)}
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 object-cover rounded-full border border-border shadow-sm"
                  />
                  <div className="flex items-center gap-1 mt-2">
                    <h3 className="text-sm font-medium truncate max-w-[80px]">
                      {artist.name}
                    </h3>
                    {artist.isVerified && (
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {artist.role}
                  </p>
                  {artist.followers && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users2 className="w-3 h-3" />
                      {Intl.NumberFormat("en-IN").format(artist.followers)}
                    </p>
                  )}
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

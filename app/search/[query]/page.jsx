"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation"; // <-- add at the top
import { Button } from "@/components/ui/button"; // <-- if you want a button

// Dummy music data (simulate backend)
const allSongs = [
  { title: "Sahiba", artist: "Aditya Rikhari" },
  { title: "Saiyaara", artist: "Faheem Abdullah" },
  { title: "Ranjha", artist: "B Praak" },
  { title: "Ehsaas", artist: "Duha Shah" },
  { title: "Closer", artist: "Chainsmokers" },
  { title: "Let Me Love You", artist: "DJ Snake" },
];

export default function SearchPage() {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const searchQuery = decodeURIComponent(query ?? "").trim();
  const router = useRouter();
  const [newQuery, setNewQuery] = useState("");

  useEffect(() => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const filtered = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 1200); // simulate 1.2s fetch delay
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold leading-tight">
          Search Results for:{" "}
          <span className="text-primary">&quot;{searchQuery}&quot;</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Showing results for your search across songs and artists.
        </p>
      </div>

      <Separator />

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((song, i) => (
            <Card key={i} className="hover:shadow-md transition">
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-base font-semibold line-clamp-1">
                  {song.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {song.artist}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't find anything for{" "}
            <strong>&quot;{searchQuery}&quot;</strong>. Try different keywords.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newQuery.trim()) {
                router.push(`/search/${encodeURIComponent(newQuery.trim())}`);
              }
            }}
            className="flex max-w-sm mx-auto items-center gap-2"
          >
            <Input
              placeholder="Try a different song or artist..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      )}
    </div>
  );
}

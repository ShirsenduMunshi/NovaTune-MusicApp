"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Play, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMusicPlayer } from "@/context/MusicPlayerContext";

const cache = {}; // move this outside the component if you want persistent cache across renders

export default function SearchPage() {
  const { query } = useParams();
  const searchQuery = decodeURIComponent(query ?? "").trim();
  const router = useRouter();
  const [newQuery, setNewQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
    topQuery: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Check cache first
      if (cache[searchQuery]) {
        console.log("Using cached data for:", searchQuery);
        setResults(cache[searchQuery]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/saavan/search?query=${query}`);
        const json = await res.json();
        console.log("Fetched from API:", json);

        if (json.results && Array.isArray(json.results)) {
          const grouped = {
            songs: [],
            albums: [],
            artists: [],
            playlists: [],
            topQuery: [],
          };

          json.results.forEach((item) => {
            const type = item.type?.toLowerCase();
            if (type === "song") grouped.songs.push(item);
            else if (type === "album") grouped.albums.push(item);
            else if (type === "artist") grouped.artists.push(item);
            else if (type === "playlist") grouped.playlists.push(item);
            else grouped.topQuery.push(item);
          });

          cache[searchQuery] = grouped; // cache the result
          setResults(grouped);
        } else {
          const empty = {
            songs: [],
            albums: [],
            artists: [],
            playlists: [],
            topQuery: [],
          };
          cache[searchQuery] = empty;
          setResults(empty);
        }
      } catch (err) {
        console.error("Error fetching:", err);
        const empty = {
          songs: [],
          albums: [],
          artists: [],
          playlists: [],
          topQuery: [],
        };
        cache[searchQuery] = empty;
        setResults(empty);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();
  }, [query, searchQuery]);

  const { setCurrentSong } = useMusicPlayer(); // Add this inside the component

  const handleCardClick = (item) => {
    localStorage.setItem("selectedSong", JSON.stringify(item));
    router.push(`/song/${item.id}`);
  };

  const renderCards = (items, type) =>
    items.map((item, i) => {
      const duration = item.duration
        ? `${Math.floor(item.duration / 60)
          .toString()
          .padStart(2, "0")}:${(item.duration % 60).toString().padStart(2, "0")}`
        : "N/A";

      const primaryArtists =
        item.artists?.primary?.map((artist) => artist.name).join(", ") || "Unknown Artist";

      const albumName = item.album?.name || "Unknown Album";

      const playCount = item.playCount
        ? item.playCount.toLocaleString()
        : "N/A";

      return (
        <Card
          key={`${type}-${i}`}
          className="hover:shadow-md transition cursor-pointer group"
          onClick={() => handleCardClick(item)}
        >
          <CardContent className="p-4 space-y-2 relative">
            {/* Image */}
            {item.image?.[2]?.url && (
              <img
                src={item.image[2].url}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
            )}

            {/* Title */}
            <CardTitle className="text-base font-semibold line-clamp-1">
              {item.name}
            </CardTitle>

            {/* Artists */}
            <p className="text-sm text-muted-foreground line-clamp-1">
              🎤 {primaryArtists}
            </p>

            {/* Album */}
            <p className="text-sm text-muted-foreground line-clamp-1">
              💿 {albumName}
            </p>

            {/* Duration, Language, Play Count */}
            <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
              <span>⏱ {duration}</span>
              <span>🌐 {item.language?.toUpperCase()}</span>
              <span>🔥 {playCount} plays</span>
              {item.explicitContent && <span>🔞 Explicit</span>}
            </div>

            {/* Play Button */}
            {type === "songs" && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card navigation
                  setCurrentSong({
                    title: item.name,
                    artist: primaryArtists,
                    src:
                      item.downloadUrl?.find((d) => d.quality === "320kbps")?.url ||
                      item.url,
                    cover: item.image?.[2]?.url,
                  });
                }}
                className="absolute bottom-4 right-4 group-hover:scale-105 transition"
              >
                <Play className="w-4 h-4 mr-1" />
                Play
              </Button>
            )}
          </CardContent>
        </Card>
      );
    });

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold leading-tight">
          Search Results for:{" "}
          <span className="text-primary">&quot;{searchQuery}&quot;</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Showing results for your search across songs, albums, artists, and more.
        </p>
      </div>

      <Separator />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Top Query */}
          {results.topQuery.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Other Matches</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderCards(results.topQuery, "topQuery")}
              </div>
            </div>
          )}

          {/* Songs */}
          {results.songs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Songs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderCards(results.songs, "songs")}
              </div>
            </div>
          )}

          {/* Albums */}
          {results.albums.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Albums</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderCards(results.albums, "albums")}
              </div>
            </div>
          )}

          {/* Artists */}
          {results.artists.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Artists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderCards(results.artists, "artists")}
              </div>
            </div>
          )}

          {/* Playlists */}
          {results.playlists.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">Playlists</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {renderCards(results.playlists, "playlists")}
              </div>
            </div>
          )}

          {/* No Results */}
          {Object.values(results).every((arr) => arr.length === 0) && (
            <div className="text-center py-16">
              <Search className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find anything for{" "}
                <strong>&quot;{searchQuery}&quot;</strong>. Try different keywords.
              </p>
            </div>
          )}
        </>
      )}

      {/* Search form */}
      <Separator className="mt-8" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newQuery.trim()) {
            router.push(`/search/${encodeURIComponent(newQuery.trim())}`);
          }
        }}
        className="flex max-w-sm mx-auto items-center gap-2 pt-4"
      >
        <Input
          placeholder="Try a different song, album, or artist..."
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}

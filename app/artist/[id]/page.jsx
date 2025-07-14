// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Separator } from "@/components/ui/separator";
// import { Play } from "lucide-react";
// import { useMusicPlayer } from "@/context/MusicPlayerContext";

// export default function ArtistPage() {
//     const { id } = useParams();
//     const [artist, setArtist] = useState(null);
//     const [albums, setAlbums] = useState([]);
//     const [songs, setSongs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { setCurrentSong } = useMusicPlayer();

//     useEffect(() => {
//         async function fetchArtistData() {
//             try {
//                 const [artistRes, songsRes, albumsRes] = await Promise.all([
//                     fetch(`https://saavn.dev/api/artists/${id}`),
//                     fetch(`https://saavn.dev/api/artists/${id}/songs`),
//                     fetch(`https://saavn.dev/api/artists/${id}/albums`),
//                 ]);

//                 const artistJson = await artistRes.json();
//                 const songsJson = await songsRes.json();
//                 const albumsJson = await albumsRes.json();

//                 console.log("Artist Data:", artistJson);
//                 console.log("Songs Data:", songsJson);
//                 console.log("Albums Data:", albumsJson);

//                 setArtist(artistJson.data);
//                 setSongs(songsJson.data?.songs || []);
//                 setAlbums(albumsJson.data?.albums || []); // ✅ THIS FIXES THE ERROR
//             } catch (err) {
//                 console.error("Failed to fetch artist data", err);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (id) fetchArtistData();
//     }, [id]);

//     if (loading || !artist) {
//         return (
//             <div className="p-6 max-w-5xl mx-auto">
//                 <Skeleton className="h-40 w-40 rounded-full mb-4" />
//                 <Skeleton className="h-6 w-40 mb-2" />
//                 <Skeleton className="h-4 w-20 mb-6" />
//                 <Skeleton className="h-6 w-full mb-2" />
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 max-w-5xl mx-auto">
//             <div className="flex gap-6 items-center mb-6">
//                 <img
//                     src={artist.image?.[2]?.url || "/images/artist-fallback.jpg"}
//                     alt={artist.name}
//                     className="w-40 h-40 rounded-full object-cover"
//                 />
//                 <div>
//                     <h1 className="text-2xl font-bold">{artist.name}</h1>
//                     <p className="text-sm text-muted-foreground">{artist.type}</p>
//                     <p className="text-sm text-muted-foreground">
//                         Followers: {artist.followerCount?.toLocaleString() || "N/A"}
//                     </p>
//                 </div>
//                 {artist.bio?.length > 0 && (
//                     <div className="space-y-2 text-sm text-muted-foreground mb-6">
//                         {artist.bio.map((paragraph, index) => (
//                             <p key={index}>{paragraph}</p>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             <Separator className="my-6" />

//             <h2 className="text-xl font-semibold mb-4">🎵 Top Songs</h2>
//             <div className="grid md:grid-cols-2 gap-4">
//                 {songs.map((song, i) => (
//                     <Card
//                         key={i}
//                         className="flex items-center gap-4 p-3 cursor-pointer hover:shadow"
//                         onClick={() =>
//                             setCurrentSong({
//                                 title: song.name,
//                                 artist:
//                                     song.artists?.primary?.map((a) => a.name).join(", ") ||
//                                     "Unknown",
//                                 src:
//                                     song.downloadUrl?.find((d) => d.quality === "320kbps")?.url ||
//                                     song.url,
//                                 cover: song.image?.[2]?.url,
//                                 artistId: song.artists?.primary?.[0]?.id,
//                             })
//                         }
//                     >
//                         <img
//                             src={song.image?.[1]?.url || "/images/cover.jpg"}
//                             className="w-12 h-12 object-cover rounded"
//                             alt={song.name}
//                         />
//                         <div className="flex-1">
//                             <CardTitle className="text-sm line-clamp-1">{song.name}</CardTitle>
//                             <p className="text-xs text-muted-foreground line-clamp-1">
//                                 {song.artists?.primary?.map((a) => a.name).join(", ")}
//                             </p>
//                         </div>
//                         <Play className="w-4 h-4 text-muted-foreground" />
//                     </Card>
//                 ))}
//             </div>

//             <Separator className="my-6" />

//             <h2 className="text-xl font-semibold mb-4">📀 Albums</h2>
//             <div className="grid md:grid-cols-3 gap-4">
//                 {albums.map((album, i) => (
//                     <Card key={i} className="overflow-hidden">
//                         <CardContent className="p-3">
//                             <img
//                                 src={album.image?.[2]?.url || "/images/cover.jpg"}
//                                 className="w-full h-48 object-cover rounded mb-2"
//                                 alt={album.name}
//                             />
//                             <CardTitle className="text-sm line-clamp-1">{album.name}</CardTitle>
//                             <p className="text-xs text-muted-foreground">
//                                 Year: {album.year || "Unknown"}
//                             </p>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Play } from "lucide-react";

export default function ArtistPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { setCurrentSong } = useMusicPlayer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [artistRes, songsRes, albumsRes] = await Promise.all([
          fetch(`https://saavn.dev/api/artists/${id}`),
          fetch(`https://saavn.dev/api/artists/${id}/songs`),
          fetch(`https://saavn.dev/api/artists/${id}/albums`),
        ]);

        const artistData = await artistRes.json();
        const songData = await songsRes.json();
        const albumData = await albumsRes.json();

        console.log("Artist Data:", artistData);
        console.log("Songs Data:", songData);
        console.log("Albums Data:", albumData);

        setArtist(artistData.data);
        setSongs(songData.data?.songs || []);
        setAlbums(albumData.data?.albums || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (loading || !artist) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-40 w-40 rounded-full" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src={artist.image?.[2]?.url || "/images/artist-fallback.jpg"}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {artist.name}
            {artist.isVerified && (
              <BadgeCheck className="text-blue-500 w-5 h-5" />
            )}
          </h1>
          <p className="text-sm text-muted-foreground capitalize">{artist.type}</p>
          <p className="text-sm text-muted-foreground">
            Followers: {Number(artist.followerCount)?.toLocaleString()}
          </p>
          {artist.dob && (
            <p className="text-sm text-muted-foreground">DOB: {artist.dob}</p>
          )}
          {artist.availableLanguages?.length > 0 && (
            <p className="text-sm text-muted-foreground">
              Languages: {artist.availableLanguages.join(", ")}
            </p>
          )}
          {artist.wiki && (
            <a
              href={artist.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline"
            >
              View Wikipedia
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {Array.isArray(artist.bio) && artist.bio.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">📝 Biography</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            {artist.bio.map((section, i) => (
              <div key={i}>
                <h3 className="font-semibold">{section.title}</h3>
                <p className="whitespace-pre-line">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Top Songs */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🎵 Top Songs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {songs.map((song, i) => (
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
        </div>
      </div>

      <Separator />

      {/* Albums */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📀 Albums</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map((album, i) => (
            <Card key={i}>
              <CardContent className="p-3">
                <img
                  src={album.image?.[2]?.url || "/images/cover.jpg"}
                  className="w-full h-48 object-cover rounded mb-2"
                  alt={album.name}
                />
                <CardTitle className="text-sm line-clamp-1">{album.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Year: {album.year || "Unknown"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

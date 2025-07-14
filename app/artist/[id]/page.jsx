"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, Play } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

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

                // console.log("Artist Data:", artistData);
                // console.log("Songs Data:", songData);
                // console.log("Albums Data:", albumData);

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
        <motion.div
            className="p-6 max-w-6xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col md:flex-row items-start gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <img
                    src={artist.image?.[2]?.url || "/images/artist-fallback.jpg"}
                    alt={artist.name}
                    className="w-40 h-40 rounded-full object-cover border shadow"
                />
                <div className="flex-1 space-y-2">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        {artist.name}
                        {artist.isVerified && <BadgeCheck className="text-blue-500 w-5 h-5" />}
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
            </motion.div>

            {/* Bio */}
            {Array.isArray(artist.bio) && artist.bio.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-2">📝 Biography</h2>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        {artist.bio.map((section, i) => (
                            <div key={i}>
                                <h3 className="font-semibold mb-1">{section.title}</h3>
                                <p className="whitespace-pre-line leading-relaxed">{section.text}</p>
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
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="cursor-pointer"
                        >
                            <Card
                                className="flex items-center gap-4 p-3 hover:shadow"
                                onClick={() =>
                                    setCurrentSong({
                                        title: song.name,
                                        artist: song.artists?.primary?.map((a) => a.name).join(", ") || "Unknown",
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
                        </motion.div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Albums */}
            <div>
                <h2 className="text-xl font-semibold mb-4">📀 Albums</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {albums.map((album, i) => (
                        <Link href={`/album/${album.id}`} key={i}>
                            <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer">
                                <Card>
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
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

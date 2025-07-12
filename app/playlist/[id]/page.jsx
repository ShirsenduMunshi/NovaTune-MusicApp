import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const dummyPlaylists = [
  {
    id: "chill-beats",
    title: "Chill Beats",
    creator: "Nova",
    cover: "/MusicBannerImage.jpg",
    songs: [
      { title: "Track 1", artist: "X" },
      { title: "Track 2", artist: "Y" },
    ],
  },
  // more playlists...
];

export default function PlaylistDetailPage({ params }) {
  const playlist = dummyPlaylists.find((p) => p.id === params.id);

  if (!playlist) return notFound();

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-8 space-y-6">
      <img
        src={playlist.cover}
        alt={playlist.title}
        className="rounded-xl w-full max-h-[300px] object-cover"
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{playlist.title}</h1>
        <p className="text-muted-foreground">By {playlist.creator}</p>
      </div>

      <ul className="space-y-2">
        {playlist.songs.map((song, i) => (
          <li
            key={i}
            className="flex items-center justify-between border border-border p-3 rounded-lg bg-card"
          >
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
            <Button variant="outline" size="icon">
              <Play className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

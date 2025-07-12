import { notFound } from "next/navigation";

export default async function SongDetailPage({ params, searchParams }) {
  const Params = await params;
  const ParamsId = await Params.id;
  const SearchParams = await searchParams;
  const song = {
    id: ParamsId,
    title: SearchParams.title,
    artist: SearchParams.artist,
    banner: SearchParams.banner,
    description: SearchParams.description,
    audio: SearchParams.audio,
  };
    // If any required field is missing
  if (!song.title || !song.audio || !song.banner) return notFound();

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-8 space-y-6">
      <img
        src={song.banner}
        alt={song.title}
        className="rounded-xl w-full max-h-[300px] object-cover"
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{song.title}</h1>
        <p className="text-muted-foreground">By {song.artist}</p>
        <p className="text-sm text-muted-foreground">{song.description}</p>
      </div>

    </div>
  );
}

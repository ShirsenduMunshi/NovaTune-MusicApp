"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useMusicPlayer } from "@/context/MusicPlayerContext"; // 💡 make sure this is correctly setup

const dummyPlaylists = [
  {
    title: "Chill Beats",
    songs: [
      { title: "Chill Vibes", artist: "Nova" , id: "1" },
      { title: "Relaxing Tunes", artist: "Aria", id: "2" },
      { title: "Mellow Moments", artist: "Zen", id: "3" },
      { title: "Smooth Jazz", artist: "Ella", id: "4" },
      { title: "Ambient Waves", artist: "Ocean", id: "5" },
      { title: "Lo-Fi Dreams", artist: "Chillzone", id: "6" },
      { title: "Acoustic Bliss", artist: "Guitarist", id: "7" },
      { title: "Nature Sounds", artist: "Forest", id: "8" },
      { title: "Evening Chill", artist: "Nightfall", id: "9" },
      { title: "Peaceful Piano", artist: "Harmony", id: "10" },
    ],
    creator: "Nova",
    cover: "/MusicBannerImage.jpg",
    id: "chill-beats",
  },
  {
    title: "Hindi Melodies",
    songs: [
      { title: "Tum Hi Ho", artist: "Arijit Singh", id: "1" },
      { title: "Kabira", artist: "Amit Trivedi", id: "2" },
      { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", id: "3" },
      { title: "Raabta", artist: "Arijit Singh", id: "4" },
      { title: "Dil Diyan Gallan", artist: "Atif Aslam", id: "5" },
      { title: "Tum Mile", artist: "Neeraj Shridhar", id: "6" },
      { title: "Pehla Nasha", artist: "Udit Narayan", id: "7" },
      { title: "Kabhi Kabhi Aditi", artist: "A.R. Rahman", id: "8" },
      { title: "Tujh Mein Rab Dikhta Hai", artist: "Roop Kumar Rathod", id: "9" },
      { title: "Chura Liya Hai Tumne Jo Dil Ko", artist: "Asha Bhosle", id: "10"},
      { title: "Tum Se Hi", artist: "Mohit Chauhan", id: "11" },
      { title: "Ae Mere Humsafar", artist: "Vinod Rathod", id: "12" },
      { title: "Tera Hone Laga Hoon", artist: "Atif Aslam", id: "13" },
      { title: "Janam Janam", artist: "Shreya Ghoshal", id: "14" },
      { title: "Dilbaro", artist: "Harshdeep Kaur", id: "15" },
    ],
    creator: "Arjun",
    cover: "/MusicBannerImage.jpg",
    id: "hindi-melodies",
  },
  {
    title: "Workout Mix",
    songs: [
      { title: "Eye of the Tiger", artist: "Survivor", id: "1" },
      { title: "Lose Yourself", artist: "Eminem", id: "2" },
      { title: "Stronger", artist: "Kanye West", id: "3" },
      { title: "Can't Hold Us", artist: "Macklemore & Ryan Lewis", id: "4" },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", id: "5" },
      { title: "Thunder", artist: "Imagine Dragons", id: "6" },
      { title: "Titanium", artist: "David Guetta ft. Sia", id: "7" },
      { title: "Don't Stop Believin'", artist: "Journey", id: "8" },
      { title: "Happy", artist: "Pharrell Williams", id: "9" },
      { title: "Shake It Off", artist: "Taylor Swift", id: "10" },
      { title: "Stronger Than Ever", artist: "Calvin Harris", id: "11" },
    ],
    creator: "Rhea",
    cover: "/MusicBannerImage.jpg",
    id: "workout-mix",
  },
  {
    title: "Focus Study",
    songs: [
      { title: "Deep Focus", artist: "Zen Mode", id: "1" },
      { title: "Study Beats", artist: "Focus Flow", id: "2" },
      { title: "Concentration Mix", artist: "Mindful Music", id: "3" },
      { title: "Ambient Study", artist: "Quiet Storm", id: "4" },
      { title: "Piano for Study", artist: "Calm Keys", id: "5" },
      { title: "Lo-Fi Chill", artist: "Study Vibes", id: "6" },
      { title: "Nature Sounds for Focus", artist: "Nature's Echo", id: "7" },
      { title: "Classical Study", artist: "Timeless Tunes", id: "8" },
      { title: "Acoustic Study", artist: "Gentle Strings", id: "9" },
      { title: "Jazz for Focus", artist: "Smooth Jazz", id: "10" },
      { title: "Electronic Study", artist: "Synth Waves", id: "11" },
      { title: "Binaural Beats", artist: "Brainwave Harmony", id: "12" },
      { title: "Focus Flow", artist: "Zen Beats", id: "13" },
      { title: "Mindful Moments", artist: "Peaceful Mind", id: "14" },
      { title: "Study Essentials", artist: "Essential Sounds", id: "15" },
    ],
    creator: "Zen Mode",
    cover: "/MusicBannerImage.jpg",
    id: "focus-study",
  },
  {
    title: "Lo-Fi Nights",
    songs: [
      { title: "Night Owl", artist: "Chillzone", id: "1" },
      { title: "Midnight Vibes", artist: "Lo-Fi Beats", id: "2" },
      { title: "Late Night Chill", artist: "Dreamy Sounds", id: "3" },
      { title: "City Lights", artist: "Urban Lo-Fi", id: "4" },
      { title: "Rainy Day Lo-Fi", artist: "Cozy Beats", id: "5" },
      { title: "Starry Nights", artist: "Lofi Dreams", id: "6" },
      { title: "Coffee Shop Vibes", artist: "Cafe Lo-Fi", id: "7" },
      { title: "Evening Glow", artist: "Chill Vibes", id: "8" },
      { title: "Waves of Calm", artist: "Ocean Lo-Fi", id: "9" },
      { title: "Dreamy Nights", artist: "Zen Chill", id: "10" },
    ],
    creator: "Chillzone",
    cover: "/MusicBannerImage.jpg",
    id: "lo-fi-nights",
  },
  {
    title: "Rock Arena",
    songs: [
      { title: "Thunderstruck", artist: "AC/DC", id: "1" },
      { title: "Bohemian Rhapsody", artist: "Queen", id: "2" },
      { title: "Hotel California", artist: "Eagles", id: "3" },
      { title: "Stairway to Heaven", artist: "Led Zeppelin", id: "4" },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses", id: "5" },
      { title: "Back in Black", artist: "AC/DC", id: "6" },
      { title: "Livin' on a Prayer", artist: "Bon Jovi", id: "7" },
      { title: "Smoke on the Water", artist: "Deep Purple", id: "8" },
      { title: "Enter Sandman", artist: "Metallica", id: "9" },
      { title: "We Will Rock You", artist: "Queen", id: "10" },
    ],
    creator: "Rocky",
    cover: "/MusicBannerImage.jpg",
    id: "rock-arena",
  },
  {
    title: "Soft Soul",
    songs: [
      { title: "Smooth Operator", artist: "Sade", id: "1" },
      { title: "Ain't No Sunshine", artist: "Bill Withers", id: "2" },
      { title: "Lovely Day", artist: "Bill Withers", id: "3" },
      { title: "Just the Two of Us", artist: "Bill Withers", id: "4" },
      { title: "Lean on Me", artist: "Bill Withers", id: "5" },
      { title: "Killing Me Softly", artist: "Roberta Flack", id: "6" },
      { title: "Let's Stay Together", artist: "Al Green", id: "7" },
      { title: "Sexual Healing", artist: "Marvin Gaye", id: "8" },
      { title: "A Change Is Gonna Come", artist: "Sam Cooke", id: "9" },
      { title: "What a Wonderful World", artist: "Louis Armstrong", id: "10" },
    ],
    creator: "Ava",
    cover: "/MusicBannerImage.jpg",
    id: "soft-soul",
  },
  {
    title: "EDM Madness",
    songs: [
      { title: "Titanium", artist: "David Guetta ft. Sia", id: "1" },
      { title: "Wake Me Up", artist: "Avicii", id: "2" },
      { title: "Animals", artist: "Martin Garrix", id: "3" },
      { title: "Lean On", artist: "Major Lazer & DJ Snake", id: "4" },
      { title: "Don't You Worry Child", artist: "Swedish House Mafia", id: "5" },
      { title: "Clarity", artist: "Zedd ft. Foxes", id: "6" },
      { title: "Turn Down for What", artist: "DJ Snake & Lil Jon", id: "7" },
      { title: "Get Lucky", artist: "Daft Punk ft. Pharrell Williams", id: "8" },
      { title: "Despacito (Remix)", artist: "Luis Fonsi & Daddy Yankee ft. Justin Bieber", id: "9" },
      { title: "Strobe", artist: "Deadmau5", id: "10" },
    ],
    creator: "NovaDJ",
    cover: "/MusicBannerImage.jpg",
    id: "edm-madness",
  },
  {
    title: "Romantic Rhythms",
    songs: [
      { title: "Perfect", artist: "Ed Sheeran", id: "1" },
      { title: "All of Me", artist: "John Legend", id: "2" },
      { title: "Can't Help Falling in Love", artist: "Elvis Presley", id: "3" },
      { title: "Thinking Out Loud", artist: "Ed Sheeran", id: "4" },
      { title: "A Thousand Years", artist: "Christina Perri", id: "5" },
      { title: "Unchained Melody", artist: "The Righteous Brothers", id: "6" },
      { title: "Your Song", artist: "Elton John", id: "7" },
      { title: "I Will Always Love You", artist: "Whitney Houston", id: "8" },
      { title: "At Last", artist: "Etta James", id: "9" },
      { title: "Make You Feel My Love", artist: "Adele", id: "10" },
    ],
    creator: "Aria",
    cover: "/MusicBannerImage.jpg",
    id: "romantic-rhythms",
  },
  {
    title: "Coding Focus",
    songs: [
      { title: "Code Flow", artist: "DevLoop", id: "1" },
      { title: "Syntax Serenity", artist: "CodeZen", id: "2" },
      { title: "Debugging Beats", artist: "Tech Tunes", id: "3" },
      { title: "Algorithmic Ambience", artist: "Logic Loops", id: "4" },
      { title: "Binary Bliss", artist: "Data Dreams", id: "5" },
      { title: "Compile and Chill", artist: "Coder's Groove", id: "6" },
      { title: "Scripted Sounds", artist: "Script Symphony", id: "7" },
      { title: "Pixelated Peace", artist: "Pixel Harmony", id: "8" },
      { title: "Techno Tinker", artist: "Gadget Grooves", id: "9" },
      { title: "Framework Focus", artist: "Framework Flow", id: "10" },
    ],
    creator: "DevLoop",
    cover: "/MusicBannerImage.jpg",
    id: "coding-focus",
  },
];

export default function PlaylistsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setCurrentSong } = useMusicPlayer();

  useEffect(() => {
    const delay = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(delay);
  }, []);

  const handleNavigate = (playlist) => {
    localStorage.setItem("selectedPlaylist", JSON.stringify(playlist));
    router.push(`/playlist/${playlist.id}`);
  };

  const handlePlayClick = (e, playlist) => {
    e.stopPropagation(); // ⛔ prevent navigation
    const firstSong = playlist.songs[0];
    if (!firstSong) return;
    setCurrentSong({
      title: firstSong.title,
      artist: firstSong.artist,
      src: "/sample.mp3", // 🔁 replace with actual audio URL if needed
      cover: playlist.cover,
    });
  };

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 bg-[#1447e633] p-2 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold">🎶 Featured Playlists</h1>
        <p className="text-sm text-muted-foreground">
          Curated collections for every vibe and moment.
        </p>
      </motion.div>

      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-border bg-card shadow-sm"
            >
              <Skeleton className="w-full h-40" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-2 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {dummyPlaylists.map((playlist, i) => (
            <div
              key={i}
              onClick={() => handleNavigate(playlist)}
              className="cursor-pointer group relative"
            >
              <motion.div
                className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="relative">
                  <img
                    src={playlist.cover}
                    alt={playlist.title}
                    className="w-full h-40 object-cover"
                  />

                  {/* 🎯 Hover Play Button */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={(e) => handlePlayClick(e, playlist)}
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Playlist Info */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate">
                    {playlist.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {playlist.songs.length} Songs
                  </p>
                  <p className="text-xs mt-1 text-muted-foreground">
                    By {playlist.creator}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      )}
    </main>
  );
}

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";

// const dummySong = {
//   title: "Dreamscape",
//   artist: "Nova AI",
//   audioUrl: "/audio/dreamscape.mp3", // Place your audio in public/audio/
//   banner: "/images/cover.jpg", // Placeholder image in public/images/
// };

// export default function MusicPlayer() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   const audioRef = useRef(null);
//   const progressRef = useRef(null);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.volume = volume;
//     }
//   }, [volume]);

//   useEffect(() => {
//     const audio = audioRef.current;
//     const updateTime = () => setCurrentTime(audio.currentTime);
//     audio.addEventListener("timeupdate", updateTime);
//     audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
//     return () => {
//       audio.removeEventListener("timeupdate", updateTime);
//     };
//   }, []);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleSeek = (value) => {
//     const audio = audioRef.current;
//     audio.currentTime = value;
//     setCurrentTime(value);
//   };

//   const toggleMute = () => {
//     setVolume((prev) => (prev > 0 ? 0 : 1));
//   };

//   const formatTime = (time) => {
//     const min = Math.floor(time / 60)
//       .toString()
//       .padStart(2, "0");
//     const sec = Math.floor(time % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${min}:${sec}`;
//   };

//   return (
//     <div className="w-full flex flex-col gap-2">
//       <audio ref={audioRef} src={dummySong.audioUrl} preload="metadata" />

//       <div className="flex items-center justify-between">
//         {/* Song Info */}
//         <div className="flex items-center gap-3">
//           <img
//             src={dummySong.banner}
//             alt={dummySong.title}
//             className="w-12 h-12 rounded-md object-cover"
//           />
//           <div className="text-sm">
//             <div className="font-medium truncate max-w-[150px]">
//               {dummySong.title}
//             </div>
//             <div className="text-muted-foreground truncate max-w-[150px]">
//               {dummySong.artist}
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center gap-4">
//           <Button size="icon" variant="ghost" disabled>
//             <SkipBack className="w-5 h-5" />
//           </Button>
//           <Button size="icon" onClick={togglePlay} variant="default">
//             {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//           </Button>
//           <Button size="icon" variant="ghost" disabled>
//             <SkipForward className="w-5 h-5" />
//           </Button>
//         </div>

//         {/* Volume */}
//         <div className="hidden md:flex items-center gap-2 w-32">
//           <Button size="icon" variant="ghost" onClick={toggleMute}>
//             {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
//           </Button>
//           <Slider
//             value={[volume]}
//             onValueChange={([val]) => setVolume(val)}
//             min={0}
//             max={1}
//             step={0.01}
//           />
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="flex items-center gap-3 text-xs text-muted-foreground">
//         <span>{formatTime(currentTime)}</span>
//         <Slider
//           value={[currentTime]}
//           onValueChange={([val]) => handleSeek(val)}
//           min={0}
//           max={duration || 100}
//           step={1}
//           className="flex-1"
//         />
//         <span>{formatTime(duration)}</span>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MusicPlayer({ song = {} }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const {
    title = "Dreamscape",
    artist = "Nova AI",
    src = "/dummy-audio.mp3", // Default dummy audio
    cover = "/images/cover.jpg", // Default image
  } = song;

  // Load audio metadata
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100);
      audio.addEventListener("timeupdate", updateProgress);
      return () => audio.removeEventListener("timeupdate", updateProgress);
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = (value / 100) * audio.duration;
      setProgress(value);
    }
  };

  const handleVolumeChange = (value) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="w-full bg-muted border-t border-border p-4 z-20">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-4">
          <img src={cover} alt="Cover" className="w-12 h-12 rounded-md object-cover" />
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2">
          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Previous">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={togglePlay} aria-label="Play/Pause">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Next">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Slider */}
          <Slider
            value={[progress]}
            onValueChange={(val) => handleSeek(val[0])}
            className="w-full max-w-xs"
          />
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={toggleMute} aria-label="Mute">
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(val) => handleVolumeChange(val[0])}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}

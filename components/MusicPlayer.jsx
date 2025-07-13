// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useMusicPlayer } from "@/context/MusicPlayerContext";
// import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";

// export default function MusicPlayer() {
//   const { currentSong } = useMusicPlayer();
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(0.7);
//   const [isMuted, setIsMuted] = useState(false);

//   const {
//     title = "Dreamscape",
//     artist = "Nova AI",
//     src = "/dummy-audio.mp3",
//     cover = "/images/cover.jpg",
//   } = currentSong || {};

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.volume = volume;
//       const updateProgress = () =>
//         setProgress((audio.currentTime / audio.duration) * 100);
//       audio.addEventListener("timeupdate", updateProgress);
//       return () => audio.removeEventListener("timeupdate", updateProgress);
//     }
//   }, [volume, currentSong]);

//   useEffect(() => {
//     // Auto play when a new song is selected
//     const audio = audioRef.current;
//     if (audio && currentSong) {
//       audio.load();
//       audio.play();
//       setIsPlaying(true);
//     }
//   }, [currentSong]);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleSeek = (value) => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.currentTime = (value / 100) * audio.duration;
//       setProgress(value);
//     }
//   };

//   const handleVolumeChange = (value) => {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.volume = value;
//       setVolume(value);
//       setIsMuted(value === 0);
//     }
//   };

//   const toggleMute = () => {
//     const audio = audioRef.current;
//     if (!audio) return;
//     if (isMuted) {
//       audio.volume = volume;
//       setIsMuted(false);
//     } else {
//       audio.volume = 0;
//       setIsMuted(true);
//     }
//   };

//   // Hide if no song is selected
//   if (!currentSong) return null;

//   return (
//     <div className="w-full bg-muted border-t border-border p-4 z-20 fixed bg-[#1447e633] bottom-0 left-0">
//       <audio ref={audioRef} src={src} preload="metadata" />
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
//         {/* Song Info */}
//         <div className="flex items-center gap-4">
//           <img src={cover} alt="Cover" className="w-12 h-12 rounded-md object-cover" />
//           <div>
//             <p className="text-sm font-semibold">{title}</p>
//             <p className="text-xs text-muted-foreground">{artist}</p>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2">
//           <div className="flex items-center gap-2">
//             <Button variant="ghost" size="icon"><SkipBack className="w-5 h-5" /></Button>
//             <Button variant="outline" size="icon" onClick={togglePlay}>
//               {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
//             </Button>
//             <Button variant="ghost" size="icon"><SkipForward className="w-5 h-5" /></Button>
//           </div>

//           <Slider
//             value={[progress]}
//             onValueChange={(val) => handleSeek(val[0])}
//             className="w-full max-w-xs"
//           />
//         </div>

//         {/* Volume */}
//         <div className="flex items-center gap-2 w-full md:w-auto">
//           <Button variant="ghost" size="icon" onClick={toggleMute}>
//             {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
//           </Button>
//           <Slider
//             value={[isMuted ? 0 : volume]}
//             min={0}
//             max={1}
//             step={0.01}
//             onValueChange={(val) => handleVolumeChange(val[0])}
//             className="w-24"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MusicPlayer() {
  const { currentSong } = useMusicPlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const {
    title = "Dreamscape",
    artist = "Nova AI",
    src = "/dummy-audio.mp3",
    cover = "/images/cover.jpg",
  } = currentSong || {};

  // Format time in mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      const onTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      };

      const onLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoadedMetadata);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }
  }, [volume, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
      audio.load();
      audio.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

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
      const newTime = (value / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
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

  // const handleDownload = () => {
  //   if (!src) return;
  //   const link = document.createElement("a");
  //   link.href = src;
  //   link.download = `${title}.mp3`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleDownload = async () => {
  if (!src) return;

  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${title}.mp4`; // Use .mp4 if it's Saavn, else use .mp3
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    alert("Download failed. Please try again.");
  }
};


  if (!currentSong) return null;

  return (
    <div className="w-full bg-muted border-t border-border p-4 z-20 fixed bottom-0 left-0">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="max-w-7xl mx-auto bg-[#1447e633] flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img src={cover} alt="Cover" className="w-12 h-12 rounded-md object-cover" />
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{artist}</p>
          </div>
        </div>

        {/* Controls + Slider */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Slider + Time */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              onValueChange={(val) => handleSeek(val[0])}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume + Download */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(val) => handleVolumeChange(val[0])}
            className="w-24"
          />
          <Button variant="ghost" size="icon" onClick={handleDownload}>
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

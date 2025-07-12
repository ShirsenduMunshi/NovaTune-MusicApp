"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MusicPlayer() {
  const { currentSong } = useMusicPlayer();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const {
    title = "Dreamscape",
    artist = "Nova AI",
    src = "/dummy-audio.mp3",
    cover = "/images/cover.jpg",
  } = currentSong || {};

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      const updateProgress = () =>
        setProgress((audio.currentTime / audio.duration) * 100);
      audio.addEventListener("timeupdate", updateProgress);
      return () => audio.removeEventListener("timeupdate", updateProgress);
    }
  }, [volume, currentSong]);

  useEffect(() => {
    // Auto play when a new song is selected
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

  // Hide if no song is selected
  if (!currentSong) return null;

  return (
    <div className="w-full bg-muted border-t border-border p-4 z-20 fixed bg-[#1447e633] bottom-0 left-0">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><SkipBack className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon"><SkipForward className="w-5 h-5" /></Button>
          </div>

          <Slider
            value={[progress]}
            onValueChange={(val) => handleSeek(val[0])}
            className="w-full max-w-xs"
          />
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
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

"use client";
import { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export function MusicPlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <MusicPlayerContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  return useContext(MusicPlayerContext);
}

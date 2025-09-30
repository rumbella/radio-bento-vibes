import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Track } from '../types';

interface PlayerContextType {
  currentTrack: Track | null;
  playlist: Track[];
  isPlaying: boolean;
  playPlaylist: (tracks: Track[], trackId?: string) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPlaylist = (tracks: Track[], trackId?: string) => {
    setPlaylist(tracks);
    const trackToPlay = trackId ? tracks.find(t => t.id === trackId) : tracks[0];
    if (trackToPlay) {
      setCurrentTrack(trackToPlay);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, playlist, isPlaying, playPlaylist, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
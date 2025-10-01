import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import type { PlaylistTrack } from '../../types';

interface PlaylistPlayerProps {
  tracks: PlaylistTrack[];
  playlistName: string;
  playlistImage: string;
}

const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({ 
  tracks, 
  playlistName,
  playlistImage 
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => 
      prev < tracks.length - 1 ? prev + 1 : 0
    );
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => 
      prev > 0 ? prev - 1 : tracks.length - 1
    );
  };

  useEffect(() => {
    // Reset to first track when tracks change
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  }, [tracks]);

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden h-full bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl">
        <div className="relative h-full w-full p-4">
          {/* Header */}
          <header className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={playlistImage}
                alt={playlistName}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="w-24 break-words">
                <h2 className="font-bold text-sm">{playlistName}</h2>
              </div>
            </div>
            <div>
              <p className="text-xs">Playlist</p>
            </div>
          </header>

          {/* Body (Play Controls) */}
          <div className="h-full flex items-center justify-center gap-4">
            <button
              onClick={prevTrack}
              className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300"
            >
              <SkipBack size={24} fill="currentColor" />
            </button>
            
            <div className={isPlaying ? 'pulse-effect' : ''}>
              <button
                onClick={togglePlay}
                className={`bg-transparent hover:bg-transparent text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white ${!isPlaying ? 'idle-pulse' : ''}`}
              >
                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />}
              </button>
            </div>

            <button
              onClick={nextTrack}
              className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300"
            >
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>

          {/* Footer */}
          <footer className="absolute bottom-4 left-4 right-4">
            <p className="text-xs text-gray-300">{currentTrack?.artist}</p>
            <p className="text-xs font-bold truncate">{currentTrack?.title}</p>
          </footer>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={playlistImage}
              alt={playlistName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">{playlistName}</h2>
              <p className="text-xs text-gray-300">Playlist</p>
            </div>
          </div>
        </header>

        {/* Body (Play Controls) */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-300">{currentTrack?.artist}</p>
            <p className="text-lg font-bold">{currentTrack?.title}</p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={prevTrack}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <div className={isPlaying ? 'pulse-effect' : ''}>
              <button
                onClick={togglePlay}
                className={`bg-black hover:bg-gray-900 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${!isPlaying ? 'idle-pulse' : ''}`}
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
              </button>
            </div>

            <button
              onClick={nextTrack}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Footer - Track info */}
        <footer className="text-center text-xs text-gray-400">
          Track {currentTrackIndex + 1} of {tracks.length}
        </footer>
      </div>
    </>
  );
};

export default PlaylistPlayer;

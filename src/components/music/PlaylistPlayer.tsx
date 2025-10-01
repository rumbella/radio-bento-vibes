import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Loader } from 'lucide-react';
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
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Effect to control audio playback
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Effect for track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      setIsLoading(true);
      if (isPlaying) {
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Failed to play next track", e));
      }
    }
  }, [currentTrackIndex, currentTrack, isPlaying]);

  // Effect to reset state on playlist change
  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [tracks]);

  // Effect for volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length]);

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const newProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(newProgress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (Number(e.target.value) / 100) * duration;
      audioRef.current.currentTime = newTime;
      setProgress(Number(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressBarBackground = {
    background: `linear-gradient(to right, #fff ${progress}%, #4a5568 ${progress}%)`
  };

  const volumeBarBackground = {
    background: `linear-gradient(to right, #fff ${isMuted ? 0 : volume * 100}%, #4a5568 ${isMuted ? 0 : volume * 100}%)`
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onEnded={handleTrackEnd}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        preload="auto"
      />

      {/* Mobile Layout */}
      <div className="lg:hidden h-full bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl">
        <div className="relative h-full w-full p-4 flex flex-col justify-between">
          {/* Header */}
          <header className="flex items-center justify-between">
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
          <div className="flex-grow flex flex-col items-center justify-center gap-2">
            <div className="text-center mb-2">
                <p className="text-xs text-gray-300">{currentTrack?.artist}</p>
                <p className="text-sm font-bold truncate">{currentTrack?.title}</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevTrack}
                className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300"
              >
                <SkipBack size={24} fill="currentColor" />
              </button>

              <div className="relative">
                <button
                  onClick={togglePlay}
                  className={`bg-transparent hover:bg-transparent text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white ${!isPlaying && !isLoading ? 'idle-pulse' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader size={36} className="animate-spin" /> : (isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />)}
                </button>
              </div>

              <button
                onClick={nextTrack}
                className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300"
              >
                <SkipForward size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Footer with Progress */}
          <footer className="w-full">
            <div className="w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
                style={progressBarBackground}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl p-6 shadow-2xl">
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

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold">{currentTrack?.title}</p>
            <p className="text-sm text-gray-300">{currentTrack?.artist}</p>
          </div>

          <div className="w-full px-4">
            <input
              ref={progressBarRef}
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
              style={progressBarBackground}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={prevTrack}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <SkipBack size={20} fill="currentColor" />
            </button>
            
            <div className="relative">
              <button
                onClick={togglePlay}
                className={`bg-black hover:bg-gray-900 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${!isPlaying && !isLoading ? 'idle-pulse' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={28} className="animate-spin" /> : (isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />)}
              </button>
            </div>

            <button
              onClick={nextTrack}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>

          <div className="w-full flex items-center justify-center gap-3 px-8">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white">
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm"
              style={volumeBarBackground}
            />
          </div>
        </div>

        <footer className="text-center text-xs text-gray-400">
          Track {currentTrackIndex + 1} of {tracks.length}
        </footer>
      </div>
    </>
  );
};

export default PlaylistPlayer;
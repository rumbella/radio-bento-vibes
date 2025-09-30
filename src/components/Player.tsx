import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Share2,
  Volume2,
  ListMusic,
  VolumeX,
} from 'lucide-react';
import { usePlayerState, usePlayerActions } from '../contexts/PlayerContext';

const Player: React.FC = () => {
  const {
    isPlaying,
    currentTrack,
    playedSeconds,
    duration,
    volume,
    muted,
  } = usePlayerState();

  const {
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
  } = usePlayerActions();

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(event.target.value);
    seekTo(newTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  if (!currentTrack) {
    return (
      <div className="bg-black/80 backdrop-blur-md text-white p-4 rounded-3xl shadow-lg flex items-center justify-center z-50 w-full">
        <p className="text-gray-400">Select a track to play</p>
      </div>
    );
  }

  const progressPercentage = duration > 0 ? (playedSeconds / duration) * 100 : 0;

  return (
    <div className="bg-black/80 backdrop-blur-md text-white p-4 rounded-3xl shadow-lg flex items-center z-50 w-full">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentTrack.imageUrl || 'https://via.placeholder.com/56'}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md"
        />
        <div>
          <h3 className="font-bold truncate">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Heart size={18} className="text-gray-400 hover:text-white cursor-pointer" />
          <Share2 size={18} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Player Controls & Seek Bar */}
      <div className="flex-grow flex flex-col items-center justify-center w-1/2">
        <div className="flex items-center space-x-6">
          <SkipBack
            onClick={prevTrack}
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-3 flex items-center justify-center transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause size={24} className="fill-black" /> : <Play size={24} className="fill-black ml-1" />}
          </button>
          <SkipForward
            onClick={nextTrack}
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>
        <div className="w-full flex items-center space-x-2 mt-2">
          <span className="text-xs text-gray-400">{formatTime(playedSeconds)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={playedSeconds}
            onChange={handleSeekChange}
            className="w-full h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${progressPercentage}%, #4a5568 ${progressPercentage}%)`,
            }}
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center space-x-4 w-1/4 justify-end">
        <button onClick={toggleMute}>
          {muted || volume === 0 ? (
            <VolumeX size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          ) : (
            <Volume2 size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, white ${muted ? 0 : volume * 100}%, #4a5568 ${muted ? 0 : volume * 100}%)`,
          }}
        />
        <ListMusic size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
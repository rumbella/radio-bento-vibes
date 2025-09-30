import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Share2,
  Volume2,
  ListMusic,
} from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

const Player: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    // Reset progress when track changes
    setProgress(0);
    setPlayedSeconds(0);
  }, [currentTrack]);


  const handleProgress = (state: { played: number, playedSeconds: number }) => {
    setProgress(state.played);
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentTrack) {
    return null; // Don't render the player if no track is selected
  }

  return (
    <div className="bg-black/80 backdrop-blur-md text-white p-4 rounded-3xl shadow-lg flex items-center z-50 w-full">
      <ReactPlayer
        ref={playerRef}
        url={currentTrack.url}
        playing={isPlaying}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
      />
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentTrack.image || 'https://via.placeholder.com/150'}
          alt={currentTrack.title}
          className="w-14 h-14 rounded-md"
        />
        <div>
          <h3 className="font-bold">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
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
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <button
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-3 flex items-center justify-center transition-transform hover:scale-105"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <SkipForward
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>
        <div className="w-full flex items-center space-x-2 mt-2">
          <span className="text-xs text-gray-400">{formatTime(playedSeconds)}</span>
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full"
              style={{ width: `${progress * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume & Other Controls */}
      <div className="flex items-center space-x-4 w-1/4 justify-end">
        <Volume2 size={20} className="text-gray-400 hover:text-white cursor-pointer" />
        <div className="w-24 bg-gray-600 rounded-full h-1">
          <div className="bg-white h-1 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <ListMusic size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default Player;
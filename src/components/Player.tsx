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
} from 'lucide-react';

const Player: React.FC = () => {
  // Mock data for the current track
  const currentTrack = {
    title: 'Love Story',
    artist: 'John Lennon',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    duration: 204, // in seconds
  };

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(10); // in seconds

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white/20 backdrop-blur-md text-white p-4 rounded-lg shadow-lg flex items-center z-50 w-full  rounded-3xl shadow-2xl rounded-lg">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/4">
        <img
          src={currentTrack.image}
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
            onClick={() => setIsPlaying(!isPlaying)}
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
          <span className="text-xs text-gray-400">{formatTime(progress)}</span>
          <div className="w-full bg-gray-600 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full"
              style={{ width: `${(progress / currentTrack.duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400">
            {formatTime(currentTrack.duration)}
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

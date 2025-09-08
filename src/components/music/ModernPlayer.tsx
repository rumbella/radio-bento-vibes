import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Share, Heart } from 'lucide-react';
import { usePlayerState, usePlayerActions } from '../../contexts/PlayerContext';
import { Slider } from '../ui/slider';

const ModernPlayer: React.FC = () => {
  const { isPlaying, currentTrack, playedSeconds, duration } = usePlayerState();
  const { togglePlay, nextTrack, prevTrack, seekTo } = usePlayerActions();

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, duration - playedSeconds);
  const isLive = !duration || !Number.isFinite(duration) || duration <= 0;
  // Fallback data if no track is loaded
  const displayData = {
    title: currentTrack?.title || "Radio Amblè",
    artist: currentTrack?.artist || "Live Stream",
    image: currentTrack?.imageUrl || "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
  };

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seekTo(newTime);
  };

  return (
    <div className="relative w-full mx-auto bg-black/80 backdrop-blur-xl rounded-3xl overflow-hidden text-white shadow-2xl">
      {/* Header with Profile and Actions */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={displayData.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">{displayData.artist}</p>
            <p className="text-xs text-gray-400">@radioamble</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Share size={16} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Heart size={16} />
          </button>
        </div>
      </div>

      {/* Artwork */}
      <div className="relative aspect-[4/5] sm:aspect-square mx-4 mb-4 rounded-2xl overflow-hidden">
        <img
          src={displayData.image}
          alt={displayData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pausa' : 'Play'}
            className="w-20 h-20 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-2">
        <Slider
          value={[duration > 0 ? (playedSeconds / duration) * 100 : 0]}
          onValueChange={handleSeek}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(playedSeconds)}</span>
          <span>{isLive ? 'Live' : `-${formatTime(remainingTime)}`}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 px-4 pb-6">
        <button
          onClick={prevTrack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <SkipBack size={20} />
        </button>
        
        <button
          onClick={togglePlay}
          className="bg-white text-black p-3 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
        
        <button
          onClick={nextTrack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default ModernPlayer;
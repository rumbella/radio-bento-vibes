import React from 'react';
import { Play, Pause, Share2, Heart } from 'lucide-react';
import { usePlayerState, usePlayerActions } from '../contexts/PlayerContext';
import { useLikes } from '../hooks/useLikes';

const RadioPlayer: React.FC = () => {
  const { isPlaying, currentTrack } = usePlayerState();
  const { togglePlay } = usePlayerActions();
  const { totalLikes, todayLikes, hasLikedToday, addLike } = useLikes();

  const formatLikes = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleLikeClick = () => {
    if (!hasLikedToday) {
      addLike();
    }
  };

  // Fallback data if no track is loaded
  const displayData = {
    title: currentTrack?.title || "Radio Amblè",
    image: currentTrack?.imageUrl || "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden h-full bg-black/20 backdrop-blur-lg border border-white/30 text-white rounded-3xl">
        <div className="relative h-full w-full p-4">
            {/* Header */}
            <header className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img
                        src={displayData.image}
                        alt={displayData.title}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="w-24 break-words">
                        <h2 className="font-bold text-sm">{displayData.title}</h2>
                    </div>
                </div>
                <div>
                    <button className="text-white" data-testid="share-button">
                        <Share2 size={20} />
                    </button>
                </div>
            </header>

            {/* Body (Play Button) */}
            <div className="h-full flex items-center justify-center">
                <div className={isPlaying ? 'pulse-effect' : ''}>
                    <button
                        onClick={togglePlay}
                        className={`bg-transparent hover:bg-transparent text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white ${!isPlaying ? 'idle-pulse' : ''}`}
                    >
                        {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button 
                  onClick={handleLikeClick}
                  className={`flex items-center space-x-2 transition-all ${
                    hasLikedToday ? 'opacity-60' : 'hover:scale-110 cursor-pointer'
                  }`}
                  data-testid="like-counter"
                >
                    <Heart 
                      size={20} 
                      className="text-white" 
                      fill={hasLikedToday ? "currentColor" : "none"}
                    />
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-bold">{formatLikes(totalLikes)} like</span>
                      <span className="text-[10px] text-white/70">+{todayLikes} oggi</span>
                    </div>
                </button>
                <div className="live-tag-container" data-testid="live-tag">
                    <div className="live-dot"></div>
                    <span className="text-xs font-bold">LIVE</span>
                </div>
            </footer>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-black/20 backdrop-blur-lg border border-white/30 text-white rounded-3xl p-6 mt-5 shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <img
                    src={displayData.image}
                    alt={displayData.title}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h2 className="font-bold text-lg">{displayData.title}</h2>
                </div>
            </div>
            <div>
                <button className="text-white" data-testid="share-button-desktop">
                    <Share2 size={24} />
                </button>
            </div>
        </header>

        {/* Body (Play Button) */}
        <div className="flex-1 flex items-center justify-center">
            <div className={isPlaying ? 'pulse-effect' : ''}>
                <button
                    onClick={togglePlay}
                    className={`bg-black hover:bg-gray-900 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${!isPlaying ? 'idle-pulse' : ''}`}
                >
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                </button>
            </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between">
            <button 
              onClick={handleLikeClick}
              className={`flex items-center space-x-2 transition-all ${
                hasLikedToday ? 'opacity-60' : 'hover:scale-110 cursor-pointer'
              }`}
              data-testid="like-counter-desktop"
            >
                <Heart 
                  size={24} 
                  className="text-white" 
                  fill={hasLikedToday ? "currentColor" : "none"}
                />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold">{formatLikes(totalLikes)} like</span>
                  <span className="text-xs text-white/70">+{todayLikes} oggi</span>
                </div>
            </button>
            <div className="live-tag-container" data-testid="live-tag-desktop">
                <div className="live-dot"></div>
                <span className="text-sm font-bold">LIVE</span>
            </div>
        </footer>
      </div>
    </>
  );
};

export default RadioPlayer;
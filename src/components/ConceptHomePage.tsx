import React from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, Share2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayerState, usePlayerActions } from '@/contexts/PlayerContext';

const ConceptHomePage: React.FC = () => {
  const { isPlaying, currentTrack, volume, muted } = usePlayerState();
  const { togglePlay, setVolume, toggleMute } = usePlayerActions();

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Vibrant Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600">
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Decorative Dots */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        {/* Central Character/Hero Section */}
        <div className="relative mb-8">
          <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
            <div className="w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Music className="w-16 h-16 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">SUONO AL</h1>
                <h2 className="text-4xl font-bold text-white">QUADRATO</h2>
                <p className="text-white/80 mt-2 font-mono text-sm">
                  con DJ Marco & Plus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Text */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">NOTHING IFD</h3>
          <p className="text-white/80 text-sm font-mono">Fresh experimental sounds</p>
        </div>
      </div>

      {/* Bottom Player - Translucent Anthracite with Blur */}
      <div className="fixed bottom-20 left-4 right-4 z-20">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
          <div className="flex items-center space-x-4">
            {/* Album Art */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 flex-shrink-0">
              <img
                src={currentTrack?.imageUrl || "/lovable-uploads/dccdbdf7-8622-4cce-b368-a753a520f74d.png"}
                alt={currentTrack?.title || "Now Playing"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm truncate">
                {currentTrack?.title || "Select a Track"}
              </h4>
              <p className="text-gray-300 text-xs truncate">
                {currentTrack?.artist || "Amblé Radio"}
              </p>
              
              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300"
                    style={{ width: '35%' }}
                  />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Heart className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-0"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="w-8 h-8 text-gray-300 hover:text-white hover:bg-white/10"
              >
                {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptHomePage;
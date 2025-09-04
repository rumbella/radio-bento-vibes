import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Users, Radio } from 'lucide-react';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentShow = {
    title: "Morning Vibes",
    host: "DJ Marco",
    listeners: 1247,
    genre: "Deep House",
    image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg"
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Layout */}
      <div className="lg:hidden h-full flex flex-col">
        {/* Header Mobile - Live, Listeners, Genre */}
        <div className="flex items-center justify-between mb-4">
          {/* Live + Listeners (sinistra) */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-liquid-lava rounded-full animate-pulse"></div>
              <span className="text-liquid-lava font-semibold text-sm uppercase tracking-wide">
                Live
              </span>
            </div>
            <div className="flex items-center space-x-1 text-dusty-grey">
              <Users size={14} />
              <span className="text-xs">{currentShow.listeners.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Genre (destra) */}
          <div className="flex items-center space-x-2 text-dusty-grey">
            <Radio size={16} />
            <span className="text-sm">{currentShow.genre}</span>
          </div>
        </div>

        {/* Centro Mobile - Immagine, Titolo, Play Button */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Immagine Show */}
          <div className="flex justify-center mb-8">
            <button
              onClick={togglePlay}
              className="bg-gluon-grey hover:bg-slate-grey text-snow p-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-slate-grey/50"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>
          </div>
          
          {/* Titolo con Immagine a sinistra */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img
              src={currentShow.image}
              alt={currentShow.title}
              className="w-12 h-12 rounded-full object-cover border-2 border-liquid-lava/30 flex-shrink-0"
            />
            <div className="text-left">
              <h2 className="text-snow font-bold text-xl mb-1">
                {currentShow.title}
              </h2>
              <p className="text-dusty-grey text-sm">
                con {currentShow.host}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full">
        {/* Live Indicator Desktop */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-liquid-lava rounded-full animate-pulse"></div>
              <span className="text-liquid-lava font-semibold text-sm uppercase tracking-wide">
                Live
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-dusty-grey">
            <Radio size={16} />
            <span className="text-sm">{currentShow.genre}</span>
          </div>
        </div>

        {/* Listeners Count Desktop */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-dusty-grey">
            <Users size={16} />
            <span className="text-sm">{currentShow.listeners.toLocaleString()} ascoltatori</span>
          </div>
        </div>

        {/* Show Info Desktop */}
        <div className="text-center mb-6 flex-1 flex flex-col justify-center">
          <div className="flex justify-center mb-3">
            <img
              src={currentShow.image}
              alt={currentShow.title}
              className="w-20 h-20 rounded-full object-cover border-2 border-liquid-lava/30"
            />
          </div>
          
          <h2 className="text-snow font-bold text-2xl mb-2">
            {currentShow.title}
          </h2>
          <p className="text-dusty-grey text-base">
            con {currentShow.host}
          </p>
        </div>

        {/* Main Controls Desktop */}
        <div className="flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-[#d41b29] hover:bg-[#d41b29]/80 text-snow p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadioPlayer;
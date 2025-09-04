import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Users, Radio } from 'lucide-react';

const RadioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const currentShow = {
    title: "Morning Vibes",
    host: "DJ Marco",
    listeners: 1247,
    genre: "Deep House",
    image: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
    artist: "Solomun",
    songTitle: "Home"
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl p-4">
        {/* Header */}
        <header className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <img
                    src={currentShow.image}
                    alt={currentShow.title}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <h2 className="font-bold text-base">{currentShow.title}</h2>
                </div>
            </div>
            <div>
                <p className="text-xs">{currentShow.host}</p>
            </div>
        </header>

        {/* Body (Play Button) */}
        <div className="flex-1 flex items-center justify-center py-2">
            <button
                onClick={togglePlay}
                className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between">
            <p className="text-xs">{currentShow.artist}</p>
            <p className="text-xs font-bold">{currentShow.songTitle}</p>
        </footer>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl p-6">
        {/* Header */}
        <header className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <img
                    src={currentShow.image}
                    alt={currentShow.title}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <h2 className="font-bold text-lg">{currentShow.title}</h2>
                </div>
            </div>
            <div>
                <p className="text-sm">{currentShow.host}</p>
            </div>
        </header>

        {/* Body (Play Button) */}
        <div className="flex-1 flex items-center justify-center">
            <button
                onClick={togglePlay}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between">
            <p className="text-sm">{currentShow.artist}</p>
            <p className="text-sm font-bold">{currentShow.songTitle}</p>
        </footer>
      </div>
    </>
  );
};

export default RadioPlayer;
import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayerState, usePlayerActions } from '../contexts/PlayerContext';

const NewRadioPlayer: React.FC = () => {
  const { isPlaying, currentTrack } = usePlayerState();
  const { togglePlay } = usePlayerActions();

  // Fallback data if no track is loaded
  const displayData = {
    title: currentTrack?.title || "Radio Amblè",
    host: currentTrack?.artist || "Live Stream",
    image: currentTrack?.imageUrl || "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
    artist: currentTrack?.artist || "",
    songTitle: currentTrack?.title || "Tune in to discover"
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden h-full bg-[#262626] backdrop-blur-md border-none text-white rounded-2xl">
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
                    <p className="text-xs">{displayData.host}</p>
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
                <p className="text-xs">{displayData.artist}</p>
                <p className="text-xs font-bold">{displayData.songTitle}</p>
            </footer>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-[#262626] backdrop-blur-md border-none text-white rounded-2xl p-6 mt-5 shadow-2xl">
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
                <p className="text-sm">{displayData.host}</p>
            </div>
        </header>

        {/* Body (Play Button) */}
        <div className="flex-1 flex items-center justify-center">
            <div className={isPlaying ? 'pulse-effect' : ''}>
                <button
                    onClick={togglePlay}
                    className={`bg-black hover:bg-gray-800 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${!isPlaying ? 'idle-pulse' : ''}`}
                >
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                </button>
            </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between">
            <p className="text-sm">{displayData.artist}</p>
            <p className="text-sm font-bold">{displayData.songTitle}</p>
        </footer>
      </div>
    </>
  );
};

export default NewRadioPlayer;

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Loader } from 'lucide-react';
import type { Resident } from '../../types';
import PlayerHeader from './PlayerHeader';
import PlayerFooter from './PlayerFooter';

interface ResidentPlayerProps {
  resident: Resident;
}

const ResidentPlayer: React.FC<ResidentPlayerProps> = ({ resident }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock audio URL - replace with actual resident mix URL
  const audioUrl = 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3';

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

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 30, 0);
    }
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressBarBackground = {
    background: `linear-gradient(to right, #fff ${progress}%, #4a5568 ${progress}%)`
  };

  const tickerText = `Now listening to ${resident.name}'s mix. ${resident.bio}`;

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        preload="auto"
      />

      <div className="bg-gluon-grey/20 backdrop-blur-md border-none text-white rounded-3xl w-full overflow-hidden shadow-lg">
        {/* Header */}
        <PlayerHeader playlistName={resident.name} onPlaylistClick={() => {}} />

        {/* Main Player UI */}
        <div className="p-2">
          <div className="flex flex-col items-center justify-between gap-3">
            {/* Resident Info */}
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="min-w-0 text-center">
                <p className="text-lg font-bold truncate">{resident.name}</p>
                <p className="text-sm text-gray-300 truncate">{resident.bio}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md px-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1.5 bg-gray-700/50 rounded-lg appearance-none cursor-pointer range-sm"
                style={progressBarBackground}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play Controls */}
            <div className="flex items-center gap-5">
              <button
                onClick={skipBackward}
                className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300"
              >
                <SkipBack size={22} fill="currentColor" />
              </button>
              <button
                onClick={togglePlay}
                className={`bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${!isPlaying && !isLoading ? 'idle-pulse' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? <Loader size={32} className="animate-spin" /> : (isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />)}
              </button>
              <button
                onClick={skipForward}
                className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300"
              >
                <SkipForward size={22} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <PlayerFooter tickerText={tickerText} />
      </div>
    </>
  );
};

export default ResidentPlayer;

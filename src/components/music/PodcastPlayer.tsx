import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Loader } from 'lucide-react';
import type { Podcast } from '../../types';
import PlayerHeader from './PlayerHeader';
import PlayerFooter from './PlayerFooter';

interface PodcastPlayerProps {
  podcast: Podcast;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ podcast }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock audio URL - replace with actual podcast audio URL
  const audioUrl = 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3';

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
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, duration);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
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

  const tickerText = `Now listening to: ${podcast.title}. ${podcast.description}`;

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

      {/* Mobile Layout */}
      <div className="lg:hidden bg-gluon-grey/20 backdrop-blur-md border-none text-white rounded-3xl w-full overflow-hidden shadow-lg">
        <PlayerHeader playlistName={podcast.title} onPlaylistClick={() => {}} />
        <div className="p-2">
          <div className="flex flex-col items-center justify-between gap-3">
            <div className="lg:hidden flex items-center justify-center gap-4 w-full">
              <img src={podcast.image} alt={podcast.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="min-w-0 text-left">
                <p className="text-lg font-bold truncate">{podcast.title}</p>
                <p className="text-sm text-gray-300 truncate">{podcast.description}</p>
              </div>
            </div>
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
            <div className="flex items-center gap-5">
              <button onClick={skipBackward} className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300">
                <SkipBack size={22} fill="currentColor" />
              </button>
              <button onClick={togglePlay} className={`bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 transform hover:scale-105 ${!isPlaying && !isLoading ? 'idle-pulse' : ''}`} disabled={isLoading}>
                {isLoading ? <Loader size={32} className="animate-spin" /> : (isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />)}
              </button>
              <button onClick={skipForward} className="bg-transparent hover:bg-white/10 text-white p-2 rounded-full transition-all duration-300">
                <SkipForward size={22} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
        <PlayerFooter tickerText={tickerText} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-col lg:h-full bg-gluon-grey/20 backdrop-blur-md border-none text-white rounded-3xl w-full overflow-hidden shadow-lg p-4">
        <PlayerHeader playlistName={podcast.title} onPlaylistClick={() => {}} />

        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-2">
          <img
            src={podcast.image}
            alt={podcast.title}
            className="w-40 h-40 xl:w-48 xl:h-48 rounded-2xl object-cover shadow-lg mb-2"
          />
          <div className="min-w-0">
            <p className="text-xl font-bold truncate">{podcast.title}</p>
            <p className="text-md text-gray-300 truncate">{podcast.description}</p>
          </div>
          <div className="flex items-center gap-5 my-2">
            <button onClick={skipBackward} className="bg-transparent hover:bg-white/10 text-white p-3 rounded-full transition-all duration-300">
              <SkipBack size={24} fill="currentColor" />
            </button>
            <button onClick={togglePlay} className={`bg-white/10 hover:bg-white/20 text-white p-5 rounded-full transition-all duration-300 transform hover:scale-105 ${!isPlaying && !isLoading ? 'idle-pulse' : ''}`} disabled={isLoading}>
              {isLoading ? <Loader size={36} className="animate-spin" /> : (isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" />)}
            </button>
            <button onClick={skipForward} className="bg-transparent hover:bg-white/10 text-white p-3 rounded-full transition-all duration-300">
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>
          <div className="w-full max-w-xs px-2">
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
        </div>

        <PlayerFooter tickerText={tickerText} />
      </div>
    </>
  );
};

export default PodcastPlayer;

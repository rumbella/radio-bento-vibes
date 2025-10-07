import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Loader } from 'lucide-react';
import type { PlaylistTrack } from '../../types';
import PlayerHeader from './PlayerHeader';
import PlayerFooter from './PlayerFooter';
import TracklistModal from './TracklistModal';

interface PlaylistPlayerProps {
  tracks: PlaylistTrack[];
  playlistName: string;
  playlistImage: string;
  currentTrackIndex?: number;
  onTrackChange?: (index: number) => void;
}

const PlaylistPlayer: React.FC<PlaylistPlayerProps> = ({
  tracks,
  playlistName,
  playlistImage,
  currentTrackIndex: externalTrackIndex,
  onTrackChange,
}) => {
  const [internalTrackIndex, setInternalTrackIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use external state if provided, otherwise use internal state
  const currentTrackIndex = externalTrackIndex !== undefined ? externalTrackIndex : internalTrackIndex;
  const setCurrentTrackIndex = onTrackChange || setInternalTrackIndex;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  // Effect to control audio playback
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

  // Effect for track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      setIsLoading(true);
      if (isPlaying) {
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Failed to play next track", e));
      }
    }
  }, [currentTrackIndex, currentTrack, isPlaying]);

  // Effect to reset state on playlist change
  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [tracks, setCurrentTrackIndex]);

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  }, [tracks.length, setCurrentTrackIndex]);

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsModalOpen(false); // Close modal on selection
    if (!isPlaying) {
      setIsPlaying(true); // Auto-play if not already playing
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

  const tickerText = `Now playing: ${currentTrack?.title} by ${currentTrack?.artist} from the playlist: ${playlistName}. Enjoy the vibes!`;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onEnded={nextTrack}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        preload="auto"
      />

      <div className="bg-gluon-grey/20 backdrop-blur-md border-none text-white rounded-3xl w-full overflow-hidden shadow-lg">
        {/* Header */}
        <PlayerHeader playlistName={playlistName} onPlaylistClick={() => setIsModalOpen(true)} />

        {/* Main Player UI */}
        <div className="p-2">
          <div className="flex flex-col items-center justify-between gap-3">
            {/* Track Info */}
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="min-w-0 text-center">
                <p className="text-lg font-bold truncate">{currentTrack?.title}</p>
                <p className="text-sm text-gray-300 truncate">{currentTrack?.artist}</p>
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
                onClick={prevTrack}
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
                onClick={nextTrack}
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

      {/* Tracklist Modal */}
      <TracklistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={handleTrackSelect}
      />
    </>
  );
};

export default PlaylistPlayer;

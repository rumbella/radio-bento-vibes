import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerState, usePlayerActions } from "@/contexts/PlayerContext"; // Import context hooks

interface PlayerBarProps {
  // Props are no longer needed as state is managed by context
}

const PlayerBar: React.FC<PlayerBarProps> = () => {
  const {
    isPlaying,
    volume,
    muted,
    currentTrack,
    playedSeconds,
    duration
  } = usePlayerState();
  const {
    togglePlay,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    seekTo
  } = usePlayerActions();

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]); // Context's setVolume expects a single number
  };

  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg mt-4">
      <div className="flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center space-x-3">
          <img
            src={currentTrack?.imageUrl || "/placeholder.svg"} // Use placeholder if no image
            alt={currentTrack?.title || "No track playing"}
            className="w-12 h-12 rounded object-cover" // Added object-cover
          />
          <div>
            <p className="text-white font-semibold text-sm truncate w-48" title={currentTrack?.title}>
              {currentTrack?.title || "No Track Selected"}
            </p>
            <p className="text-gray-400 text-xs truncate w-48" title={currentTrack?.artist}>
              {currentTrack?.artist || "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Player Controls & Progress Bar */}
        <div className="flex flex-col items-center flex-grow mx-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={prevTrack} // Use context action
              disabled={!currentTrack}
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              onClick={togglePlay} // Use context action
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center"
              disabled={!currentTrack}
            >
              {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={nextTrack} // Use context action
              disabled={!currentTrack}
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>
          {/* Progress Bar */}
          {currentTrack && ( // Only show progress bar if there's a track
            <div className="w-full flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-400 w-8 text-right">{formatTime(playedSeconds)}</span>
              <Slider
                value={[playedSeconds]}
                max={duration || 100} // Use actual duration
                step={1}
                onValueChange={handleSeek} // Use seek action
                className="flex-grow h-1 bg-gray-700 rounded-full [&>span:first-child]:bg-white"
                disabled={!currentTrack || duration === 0}
              />
              <span className="text-xs text-gray-400 w-8 text-left">{formatTime(duration)}</span>
            </div>
          )}
        </div>

        {/* Volume Controls & Other Actions */}
        <div className="hidden sm:flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Heart className="w-4 h-4" /> {/* Placeholder */}
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MessageCircle className="w-4 h-4" /> {/* Placeholder */}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-400 hover:text-white">
            {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume]} // volume from context is 0-1
            onValueChange={handleVolumeChange}
            max={1} // Max is 1 for context volume
            step={0.01}
            className="w-20 h-1 bg-gray-700 rounded-full [&>span:first-child]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;

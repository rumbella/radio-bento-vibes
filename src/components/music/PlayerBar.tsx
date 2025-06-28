import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface PlayerBarProps {
  // Define props needed for the player bar, e.g.,
  // isPlaying: boolean;
  // onPlayPause: () => void;
  // onNext: () => void;
  // onPrevious: () => void;
  // volume: number;
  // onVolumeChange: (volume: number) => void;
  // currentSongTitle?: string;
  // currentArtist?: string;
}

const PlayerBar: React.FC<PlayerBarProps> = (
  {
    /* Destructure props here */
  }
) => {
  // Example state - replace with props or more robust state management
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setMuted(false);
  };
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(0.5); // Unmute to a default volume
    }
  };

  // Placeholder functions for skip actions
  const handleNext = () => console.log("Next track");
  const handlePrevious = () => console.log("Previous track");

  // Placeholder data - replace with props
  const currentSongTitle = "Free Fall (Visualizer) (feat. J. Cole)";
  const currentArtist = "Tems • Born in the Wild • 2024 • 4:15";

  return (
    <div className="bg-black/50 backdrop-blur-md p-4 rounded-lg mt-4">
      {" "}
      {/* Added mt-4 for spacing, adjust as needed */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg" // Replace with actual album art prop
            alt="Album art"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="text-white font-semibold text-sm truncate w-48" title={currentSongTitle}>
              {currentSongTitle}
            </p>
            <p className="text-gray-400 text-xs truncate w-48" title={currentArtist}>
              {currentArtist}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={handlePrevious}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            onClick={togglePlay}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={handleNext}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        <div className="hidden sm:flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-gray-400 hover:text-white">
            {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-20 h-1 bg-gray-700 rounded-full [&>span:first-child]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;

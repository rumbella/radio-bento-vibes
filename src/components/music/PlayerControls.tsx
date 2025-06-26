
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2, VolumeX, Fullscreen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PlayerControlsProps {
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  togglePlay: () => void;
  handleVolumeChange: (newVolume: number[]) => void;
  toggleMute: () => void;
}

const PlayerControls = ({ 
  isPlaying, 
  volume, 
  muted, 
  togglePlay, 
  handleVolumeChange, 
  toggleMute 
}: PlayerControlsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-50">
      <div className="flex items-center justify-between max-w-full mx-auto">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-12 h-12 rounded overflow-hidden">
            <img src="/lovable-uploads/b4c57b68-ffb5-469d-b8a8-f89176efa04e.png" alt="Current Track" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">Free Fall</p>
            <p className="text-gray-400 text-xs">Tems</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex items-center space-x-6 flex-1 justify-center">
          <Button variant="ghost" size="icon" className="text-white">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/90">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress and Volume */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <span className="text-xs text-gray-400">0:10</span>
          <Slider
            value={[30]}
            max={100}
            step={1}
            className="w-32 h-1 bg-gray-600 rounded-full"
          />
          <span className="text-xs text-gray-400">-3:24</span>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white">
            {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume * 100]}
            onValueChange={(value) => handleVolumeChange([value[0] / 100])}
            max={100}
            step={1}
            className="w-20 h-1 bg-gray-600 rounded-full"
          />
          <Button variant="ghost" size="icon" className="text-white">
            <Fullscreen className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;

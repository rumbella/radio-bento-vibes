import { useState, useRef, ReactNode } from "react";
import { Link } from "react-router-dom"; // Import Link
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Program } from "@/pages/Index"; // Assuming Program interface is exported from Index.tsx or a types file

export interface RadioPageLayoutProps {
  backgroundElement: ReactNode;
  children: ReactNode;
  currentProgramForPlayer: Program | null;
  headerActions?: ReactNode; // For test buttons or other page-specific header items
  isPlaying: boolean; // Controlled from the page (e.g., Index.tsx)
  onTogglePlay: () => void; // Callback to toggle play state in the page
}

const RadioPageLayout: React.FC<RadioPageLayoutProps> = ({
  backgroundElement,
  children,
  currentProgramForPlayer,
  headerActions,
  isPlaying,
  onTogglePlay,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setMuted(false);
  };

  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(0.5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 relative overflow-hidden">
      {/* Background Element is rendered first */}
      {backgroundElement}
      {/* Global Overlay, rendered on top of backgroundElement */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0"></div>

      <ReactPlayer
        ref={playerRef}
        url={currentProgramForPlayer ? currentProgramForPlayer.audioUrl : ""}
        playing={isPlaying}
        volume={volume}
        muted={muted}
        controls={false}
        width="0px"
        height="0px"
        onPlay={() => { if (!isPlaying) onTogglePlay(); }} // Sync if external play happens
        onPause={() => { if (isPlaying) onTogglePlay(); }} // Sync if external pause happens
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s"
              alt="Amblé Radio"
              className="w-10 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Amblé Radio</h1>
            <p className="text-white/70 text-sm">Fresh Sound & Podcasts</p>
          </div>
        </div>
        <nav className="flex items-center space-x-6">
          <Button variant="ghost" className="text-white hover:bg-white/10">Live</Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">Podcasts</Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">Schedule</Button>

          {/* Added Navigation Links */}
          <Link to="/"><Button variant="ghost" className="text-white hover:bg-white/10">Image BG</Button></Link>
          <Link to="/sponsor-video"><Button variant="ghost" className="text-white hover:bg-white/10">Video BG</Button></Link>
          <Link to="/program-slideshow"><Button variant="ghost" className="text-white hover:bg-white/10">Slideshow BG</Button></Link>

          {headerActions} {/* Existing page-specific test buttons */}
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
        </nav>
      </header>

      {/* Main Content Grid */}
      <div className="relative z-10 flex justify-between h-[calc(100vh-200px)] px-12">
        {children}
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">{currentProgramForPlayer ? currentProgramForPlayer.name : "Live Stream"}</p>
              <p className="text-white/60 text-sm">{currentProgramForPlayer ? currentProgramForPlayer.host : "Amblé Radio"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              onClick={onTogglePlay}
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
              {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider
              value={[muted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="w-20 h-1 bg-white/20 rounded-full [&>span:first-child]:bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadioPageLayout;


import { useState, useEffect } from "react";
import { Program } from "./Index";
import MusicSidebar from "@/components/music/MusicSidebar";
import MusicVisualizer from "@/components/music/MusicVisualizer";
import LyricsPanel from "@/components/music/LyricsPanel";
import PlayerControls from "@/components/music/PlayerControls";

const MusicVisualizerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setCurrentProgram({
      id: "freefall",
      name: "Free Fall (Visualizer) (feat. J. Cole)",
      host: "Tems",
      imageUrl: "/lovable-uploads/b4c57b68-ffb5-469d-b8a8-f89176efa04e.png",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    });
  }, []);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setMuted(false);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <MusicSidebar />
      
      <div className="flex-1 flex">
        <MusicVisualizer 
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
        />
        <LyricsPanel />
      </div>

      <PlayerControls
        isPlaying={isPlaying}
        volume={volume}
        muted={muted}
        togglePlay={togglePlay}
        handleVolumeChange={handleVolumeChange}
        toggleMute={toggleMute}
      />
    </div>
  );
};

export default MusicVisualizerPage;

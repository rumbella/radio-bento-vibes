
import { useState, useEffect } from "react";
import { Program } from "./Index";
import MusicSidebar from "@/components/music/MusicSidebar";
import LyricsPanel from "@/components/music/LyricsPanel";
import RelatedVideos from "@/components/music/RelatedVideos";
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
    <div className="bg-black text-white h-screen overflow-hidden">
      <MusicSidebar />
      <main className="ml-20 p-4 h-full flex flex-col">
        <div className="flex justify-between text-gray-400 mb-4">
          <span className="cursor-pointer hover:text-white">Minimize</span>
          <span className="cursor-pointer hover:text-white" onClick={toggleFullScreen}>
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </span>
        </div>
        <div className="flex flex-grow space-x-4 overflow-hidden">
          <div className="relative flex-1">
            <img 
              src="/lovable-uploads/b4c57b68-ffb5-469d-b8a8-f89176efa04e.png" 
              className="w-full h-full object-cover rounded-lg" 
              alt="Artist Visualizer"
            />
            <div className="absolute bottom-4 left-4 bg-black/60 p-4 rounded-lg">
              <p className="text-sm text-gray-300">Song</p>
              <h2 className="font-semibold text-white">Free Fall (Visualizer) (feat. J. Cole)</h2>
              <p className="text-xs text-gray-400">Tems • Born in the Wild • 2024 • 4:15 • 103,254,549</p>
            </div>
          </div>
          <div className="w-2/5 flex flex-col space-y-4">
            <LyricsPanel />
            <RelatedVideos />
          </div>
        </div>
      </main>
      
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

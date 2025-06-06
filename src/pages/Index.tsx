
import { useState, useEffect } from "react";
// ReactPlayer and its specific controls (Slider, VolumeX, SkipBack, SkipForward, Volume2) are moved to RadioPageLayout
import { Play, Pause, Heart, Mic, Radio, Users, Clock } from "lucide-react"; // Keep icons used in Index's direct children
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RadioPageLayout from "@/components/layout/RadioPageLayout"; // Import the new layout

// Define Interfaces (Export them)
export interface Program {
  id: string;
  name: string;
  host: string;
  imageUrl: string;
  audioUrl: string;
}

export interface Advertisement {
  id: string;
  name: string;
  imageUrl: string;
  videoUrl?: string;
  targetUrl: string;
}

// Mock Data
export const mockPrograms: Program[] = [
  {
    id: "program1",
    name: "Morning Vibes",
    host: "Marco & Sofia",
    imageUrl: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "program2",
    name: "Tech Talk",
    host: "Alessandro R.",
    imageUrl: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "program3",
    name: "Lunch Beats",
    host: "DJ Luna",
    imageUrl: "https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    name: "Awesome Product",
    imageUrl: "https://placehold.co/600x400/E74C3C/FFFFFF/png?text=Ad+1",
    targetUrl: "https://example.com/product",
  },
  {
    id: "ad2",
    name: "Amazing Service",
    imageUrl: "https://placehold.co/600x400/3498DB/FFFFFF/png?text=Ad+2",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    targetUrl: "https://example.com/service",
  },
];

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Controls UI elements in Index & passed to layout
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(mockPrograms[0].imageUrl);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [currentAdvertisement, setCurrentAdvertisement] = useState<Advertisement | null>(mockAdvertisements[0]);
  // playerRef, volume, muted, handleVolumeChange, toggleMute are now managed by RadioPageLayout

  const togglePlay = () => {
    setIsPlaying(prev => !prev); // This function is passed to layout as onTogglePlay
  };

  const setBackground = (url: string) => {
    setCurrentBackgroundImage(url);
  };

  const setCurrentProgramById = (id: string) => {
    const program = mockPrograms.find(p => p.id === id);
    if (program) {
      setCurrentProgram(program);
    }
  };

  const setCurrentAdvertisementById = (id: string) => {
    const ad = mockAdvertisements.find(a => a.id === id);
    if (ad) {
      setCurrentAdvertisement(ad);
    }
  };

  useEffect(() => {
    // Set initial program when component mounts
    if (mockPrograms.length > 0 && !currentProgram) { // Ensure it only sets if not already set
      setCurrentProgram(mockPrograms[0]);
    }
  }, [currentProgram]); // Add currentProgram to dependency array to prevent re-setting if it's already set by other means.

  useEffect(() => {
    if (currentProgram) {
      setBackground(currentProgram.imageUrl);
    }
  }, [currentProgram]);

  useEffect(() => {
    if (currentAdvertisement && currentAdvertisement.videoUrl) {
      console.log("Current advertisement has video: ", currentAdvertisement.videoUrl);
    }
  }, [currentAdvertisement]);

  const headerActionButtons = (
    <>
      <Button onClick={() => setCurrentProgramById("program2")} className="text-white hover:bg-white/10">Set P2</Button>
      <Button onClick={() => setCurrentProgramById("program3")} className="text-white hover:bg-white/10">Set P3</Button>
      <Button onClick={() => setCurrentAdvertisementById("ad1")} className="text-white hover:bg-white/10">Set Ad1</Button>
      <Button onClick={() => setCurrentAdvertisementById("ad2")} className="text-white hover:bg-white/10">Set Ad2</Button>
    </>
  );

  return (
    <RadioPageLayout
      backgroundElement={
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" // Ensured w-full h-full
          style={{ backgroundImage: `url('${currentBackgroundImage}')` }}
          // The inner overlay div has been removed.
        />
      }
      currentProgramForPlayer={currentProgram}
      headerActions={headerActionButtons}
      isPlaying={isPlaying}
      onTogglePlay={togglePlay}
    >
      {/* Children: Left and Right Sidebars passed to the layout */}
      <div className="w-1/4 grid grid-cols-2 gap-4">
        {/* Current Show Card */}
        <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-xs font-medium">LIVE NOW</span>
            </div>
            <h2 className="text-white text-xl font-bold mb-1">{currentProgram ? currentProgram.name : "Loading..."}</h2>
            <p className="text-white/70 text-sm mb-2">with {currentProgram ? currentProgram.host : "..."}</p>
            <p className="text-white/60 text-xs">Broadcasting live with the latest hits and talks.</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>
            <div className="text-white flex-1 ml-3">
              <p className="text-xs opacity-70">Now Playing</p>
              <p className="font-medium text-sm">Tame Impala</p> {/* Placeholder */}
            </div>
          </div>
        </Card>

        {/* Popular Podcasts Card */}
        <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-3">
          <h3 className="text-white font-semibold mb-3 text-sm">Popular Podcasts</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-1">
                <img className="rounded-lg" src="https://placehold.co/400x100/cccccc/FFFFFF/png" />
              </div>
              <p className="text-white text-xs font-medium">Tech & Innovation</p>
              <p className="text-white/60 text-xs">24 ep</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-1">
                <img className="rounded-lg" src="https://placehold.co/400x100/cccccc/FFFFFF/png" />
              </div>
              <p className="text-white text-xs font-medium">Culture & Arts</p>
              <p className="text-white/60 text-xs">18 ep</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="w-1/4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Advertisement Card */}
        {currentAdvertisement && (
          <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-0 overflow-hidden">
            <a href={currentAdvertisement.targetUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={currentAdvertisement.imageUrl}
                alt={currentAdvertisement.name}
                className="w-full h-auto object-cover"
              />
            </a>
            <div className="p-3">
              <p className="text-white text-xs font-medium truncate" title={currentAdvertisement.name}>
                {currentAdvertisement.name}
              </p>
            </div>
          </Card>
        )}
        {!currentAdvertisement && (
           <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4 flex items-center justify-center">
            <p className="text-white/70 text-sm">No advertisement to display.</p>
          </Card>
        )}

        {/* Schedule Card */}
        <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-white" />
            <h3 className="text-white font-semibold text-sm">Today's Schedule</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/10">
              <div>
                <p className="text-white font-medium text-sm">Morning Vibes</p>
                <p className="text-white/60 text-xs">Marco & Sofia</p>
              </div>
              <div className="text-right">
                <p className="text-white text-xs">06:00 - 10:00</p>
                <div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium text-sm">Tech Talk</p>
                <p className="text-white/60 text-xs">Alessandro R.</p>
              </div>
              <p className="text-white/60 text-xs">10:00 - 12:00</p>
            </div>
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium text-sm">Lunch Beats</p>
                <p className="text-white/60 text-xs">DJ Luna</p>
              </div>
              <p className="text-white/60 text-xs">12:00 - 14:00</p>
            </div>
          </div>
        </Card>

        {/* More Stats Cards */}
        <Card className="bg-black/30 backdrop-blur-lg border-white/10 p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Radio className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-white/70 text-xs">Live Hours</span>
          </div>
          <p className="text-white text-lg font-bold">18</p>
          <p className="text-green-400 text-xs">Daily avg</p>
        </Card>
        <Card className="bg-black/30 backdrop-blur-lg border-white/10 p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Heart className="w-3 h-3 text-orange-400" />
            </div>
            <span className="text-white/70 text-xs">Favorites</span>
          </div>
          <p className="text-white text-lg font-bold">1.2k</p>
          <p className="text-orange-400 text-xs">This month</p>
        </Card>
        <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-3">
          <h3 className="text-white font-semibold mb-3 text-sm">Recent Activity</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                <Radio className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-white text-xs">New episode available</p>
                <p className="text-white/60 text-xs">Tech & Innovation - 2h ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-white text-xs">1000+ new followers</p>
                <p className="text-white/60 text-xs">This week</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-white text-xs">Most liked show</p>
                <p className="text-white/60 text-xs">Morning Vibes - Today</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </RadioPageLayout>
  );
};

export default Index;

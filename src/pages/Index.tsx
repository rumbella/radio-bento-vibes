
import { useState, useRef, useEffect } from "react";
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Mic, Radio, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Define Interfaces
interface Program {
  id: string;
  name: string;
  host: string;
  imageUrl: string;
  audioUrl: string;
}

interface Advertisement {
  id: string;
  name: string;
  imageUrl: string;
  videoUrl?: string;
  targetUrl: string;
}

// Mock Data
const mockPrograms: Program[] = [
  {
    id: "program1",
    name: "Morning Vibes",
    host: "Marco & Sofia",
    imageUrl: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg",
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

const mockAdvertisements: Advertisement[] = [
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
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(mockPrograms[0].imageUrl); // Initialize with first program's image
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [currentAdvertisement, setCurrentAdvertisement] = useState<Advertisement | null>(mockAdvertisements[0]); // Initialize with first ad

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
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
    if (mockPrograms.length > 0) {
      setCurrentProgram(mockPrograms[0]);
    }
  }, []);

  useEffect(() => {
    if (currentProgram) {
      setBackground(currentProgram.imageUrl);
      // The ReactPlayer URL will be directly bound to currentProgram.audioUrl in the JSX
    }
  }, [currentProgram]);

  useEffect(() => {
    if (currentAdvertisement && currentAdvertisement.videoUrl) {
      console.log("Current advertisement has video: ", currentAdvertisement.videoUrl);
    }
  }, [currentAdvertisement]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${currentBackgroundImage}')`
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      </div>

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
          {/* Test button for changing program */}
          <Button
            onClick={() => setCurrentProgramById("program2")}
            className="text-white hover:bg-white/10"
          >
            Set P2
          </Button>
          <Button
            onClick={() => setCurrentProgramById("program3")}
            className="text-white hover:bg-white/10"
          >
            Set P3
          </Button>
          <Button
            onClick={() => setCurrentAdvertisementById("ad1")}
            className="text-white hover:bg-white/10"
          >
            Set Ad1
          </Button>
          <Button
            onClick={() => setCurrentAdvertisementById("ad2")}
            className="text-white hover:bg-white/10"
          >
            Set Ad2
          </Button>
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
        </nav>
      </header>

      <ReactPlayer
        ref={playerRef}
        url={currentProgram ? currentProgram.audioUrl : ""}
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width="0" // Hidden player
        height="0" // Hidden player
      />

      {/* Main Content Grid - Reduced Width for More Background Visibility */}
      <div className="relative z-10 flex justify-between h-[calc(100vh-200px)] px-12">
        
        {/* Left Side - Reduced to 25% of screen */}
        <div className="w-1/4 grid grid-cols-2 gap-4">
          
          {/* Current Show - Spanning full width */}
          <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-xs font-medium">LIVE NOW</span>
              </div>
              <h2 className="text-white text-xl font-bold mb-1">{currentProgram ? currentProgram.name : "Loading..."}</h2>
              <p className="text-white/70 text-sm mb-2">with {currentProgram ? currentProgram.host : "..."}</p>
              {/* Assuming a generic description for now, can be added to Program interface later */}
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
                <p className="font-medium text-sm">Tame Impala</p>
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
    

         

          {/* Popular Podcasts */}
          <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-3">
            <h3 className="text-white font-semibold mb-3 text-sm">Popular Podcasts</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-1">
                  <img class="rounded-lg" src="https://placehold.co/400x100/cccccc/FFFFFF/png"
                </div>
                <p className="text-white text-xs font-medium">Tech & Innovation</p>
                <p className="text-white/60 text-xs">24 ep</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-1">
                  <img class="rounded-lg" src="https://placehold.co/400x100/cccccc/FFFFFF/png"
                </div>
                <p className="text-white text-xs font-medium">Culture & Arts</p>
                <p className="text-white/60 text-xs">18 ep</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Side - Reduced to 25% of screen */}
        <div className="w-1/4 grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Adjusted grid for ad card */}
          
          {/* Advertisement Card */}
          {currentAdvertisement && (
            <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-0 overflow-hidden"> {/* Adjusted span for responsiveness */}
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

          {/* Schedule */}
          <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4"> {/* Adjusted span */}
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

          {/* More Stats */}
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

          {/* Recent Activity */}
          <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-3">
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
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Now Playing Info */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">{currentProgram ? currentProgram.name : "Live Stream"}</p>
              <p className="text-white/60 text-sm">{currentProgram ? currentProgram.host : "Amblé Radio"}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <SkipBack className="w-5 h-5" />
            </Button>
            
            <Button 
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Volume and Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-white" />
              <div className="w-20 h-1 bg-white/20 rounded-full">
                <div className="w-12 h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

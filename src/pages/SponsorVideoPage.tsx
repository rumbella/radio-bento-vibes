import { useState, useEffect, ReactNode } from "react";
import { Play, Pause, Heart, Mic, Radio, Users, Clock } from "lucide-react"; // Icons used in sidebars
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RadioPageLayout from "@/components/layout/RadioPageLayout";
import { Program, Advertisement } from "./Index"; // Assuming interfaces are exported from Index.tsx

// Mock Data (copied from Index.tsx for now, ideally this would be shared or fetched)
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
];

const mockAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    name: "Awesome Product",
    imageUrl: "https://res.cloudinary.com/thinkdigital/image/upload/v1750257627/images_kj2qyb.png",
    targetUrl: "https://www.revolut.com/it-IT/",
  },
  {
    id: "ad2",
    name: "Amazing Service",
    imageUrl: "https://placehold.co/600x400/3498DB/FFFFFF/png?text=Ad+2",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Using this for video background
    targetUrl: "https://example.com/service",
  },
];

const SponsorVideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [currentAdvertisement, setCurrentAdvertisement] = useState<Advertisement | null>(null);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
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
      // Potentially change video background if ad changes and has a video
      // if (ad.videoUrl) setVideoBackgroundUrl(ad.videoUrl);
    }
  };

  useEffect(() => {
    if (mockPrograms.length > 0 && !currentProgram) {
      setCurrentProgram(mockPrograms[0]);
    }
    if (mockAdvertisements.length > 0 && !currentAdvertisement) {
      setCurrentAdvertisement(mockAdvertisements[0]); // Set initial ad for display
    }
  }, [currentProgram, currentAdvertisement]);

  useEffect(() => {
    if (currentAdvertisement && currentAdvertisement.videoUrl) {
      console.log("Current advertisement video for SponsorVideoPage: ", currentAdvertisement.videoUrl);
    }
  }, [currentAdvertisement]);


  const backgroundVideoElement = (
    <iframe
      src="https://www.youtube.com/embed/QBoMdVFsQkI?autoplay=1&loop=1&playlist=QBoMdVFsQkI&mute=1"
      frameBorder="0"
      allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        top: 0,
        left: 0,
      }}
      title="Sponsor Video"
    ></iframe>
  );

  const headerActionButtons = (
    <>
      <Button onClick={() => setCurrentProgramById("program2")} className="text-white hover:bg-white/10">Set P2 (Sponsor)</Button>
      <Button onClick={() => setCurrentAdvertisementById("ad1")} className="text-white hover:bg-white/10">Set Ad1 (Sponsor)</Button>
    </>
  );

  return (
    <RadioPageLayout
      backgroundElement={backgroundVideoElement}
      currentProgramForPlayer={currentProgram}
      headerActions={headerActionButtons}
      isPlaying={isPlaying}
      onTogglePlay={togglePlay}
    >
      {/* Copied Sidebar Content from Index.tsx - This should ideally be componentized further in a real app */}
      <div className="w-1/4 grid grid-cols-2 gap-4">
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
              <p className="font-medium text-sm">Sponsor Page Player</p>
            </div>
          </div>
        </Card>
        <Card className="col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-3">
          <h3 className="text-white font-semibold mb-3 text-sm">Popular Podcasts</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-1">
                <img className="rounded-lg" src="https://placehold.co/400x100/cccccc/FFFFFF/png" alt="Tech Podcast" />
              </div>
              <p className="text-white text-xs font-medium">Tech & Innovation</p>
              <p className="text-white/60 text-xs">24 ep</p>
            </div>
            <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-full h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-1">
                <img className="rounded-lg" src="https://placehold.co/400x100/cccccc/FFFFFF/png" alt="Culture Podcast" />
              </div>
              <p className="text-white text-xs font-medium">Culture & Arts</p>
              <p className="text-white/60 text-xs">18 ep</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-1/4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-white" />
            <h3 className="text-white font-semibold text-sm">Today's Schedule</h3>
          </div>
          <div className="space-y-2">
             {/* Simplified schedule for brevity */}
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
              <div><p className="text-white font-medium text-sm">Sponsored Show</p><p className="text-white/60 text-xs">With Host</p></div>
              <p className="text-white/60 text-xs">14:00 - 18:00</p>
            </div>
          </div>
        </Card>
         <Card className="bg-black/30 backdrop-blur-lg border-white/10 p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Radio className="w-3 h-3 text-green-400" /> <span className="text-white/70 text-xs">Live Hours</span>
            </div>
            <p className="text-white text-lg font-bold">Sponsor Page</p>
        </Card>
        <Card className="bg-black/30 backdrop-blur-lg border-white/10 p-3">
            <div className="flex items-center space-x-2 mb-2">
             <Heart className="w-3 h-3 text-orange-400" /> <span className="text-white/70 text-xs">Favorites</span>
            </div>
            <p className="text-white text-lg font-bold">Video BG</p>
        </Card>
      </div>
    </RadioPageLayout>
  );
};

export default SponsorVideoPage;

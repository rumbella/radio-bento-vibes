import React, { useState, useEffect } from "react";
import { Heart, Radio as RadioIcon, Users, Clock } from "lucide-react"; // Renamed Radio to RadioIcon to avoid conflict
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// RadioPageLayout is no longer used here. MainLayout will wrap this page.
import { usePlayerActions, usePlayerState } from "@/contexts/PlayerContext";

// Define Interfaces (Export them if used elsewhere, or keep local if only for this page)
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

// Mock Data (Consider moving to a dedicated data file if used by multiple components)
export const mockPrograms: Program[] = [
  {
    id: "program1",
    name: "Morning Vibes",
    host: "Marco & Sofia",
    imageUrl: "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg",
    audioUrl: "https://mqugxowc-lbmedia.radioca.st/stream?type=http&nocache=43",
  },
  {
    id: "program2",
    name: "Tech Talk",
    host: "Alessandro R.",
    imageUrl: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  // ... other programs
];

export const mockAdvertisements: Advertisement[] = [
  {
    id: "ad1",
    name: "Awesome Product",
    imageUrl: "https://placehold.co/600x400/E74C3C/FFFFFF/png?text=Ad+1",
    targetUrl: "https://example.com/product",
  },
  // ... other advertisements
];

const Index: React.FC = () => {
  // Local state for this page's specific content, not player controls
  // const [currentBackgroundImage, setCurrentBackgroundImage] = useState(mockPrograms[0].imageUrl); // Background is part of page content now
  const [currentAdvertisement, setCurrentAdvertisement] = useState<Advertisement | null>(mockAdvertisements[0]);

  const { playStream } = usePlayerActions();
  const { currentTrack, playerMode } = usePlayerState();

  // Effect to set a default stream if nothing is playing and this page is loaded.
  // This behavior might be better handled globally in PlayerProvider or App.tsx for the initial app load.
  useEffect(() => {
    if (!currentTrack && mockPrograms.length > 0 && playerMode !== 'live') {
      // playStream(mockPrograms[0]); // Example: auto-play first program
    }
  }, [currentTrack, playerMode, playStream]);

  // const setBackground = (url: string) => {
  //   setCurrentBackgroundImage(url);
  // };

  const setCurrentProgramByIdAndPlay = (id: string) => {
    const program = mockPrograms.find(p => p.id === id);
    if (program) {
      playStream(program); // Use context action to play the stream
      // setBackground(program.imageUrl); // Page background can change if desired
    }
  };

  const setCurrentAdvertisementById = (id: string) => {
    const ad = mockAdvertisements.find(a => a.id === id);
    if (ad) {
      setCurrentAdvertisement(ad);
    }
  };

  // Example: Use currentTrack's imageUrl for background or a default
  const pageSpecificBackgroundStyle = {
    backgroundImage: `url('${currentTrack?.imageUrl || mockPrograms[0].imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    // position: 'absolute', // If it should be a full bleed background for the <main> area
    // top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 // Ensure it's behind content
  };


  return (
    // This div represents the content that will go into MainLayout's {children}
    // It can have its own background styling if needed.
    <div className="p-4 md:p-8 text-white relative" style={{minHeight: 'calc(100vh - 120px)'}}> {/* Adjust minHeight based on header/footer */}
      {/* Full page background element specific to this page */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-30" // Example styling
        style={{ backgroundImage: `url('${currentTrack?.imageUrl || mockPrograms[0].imageUrl}')` }}
      />
      <div className="relative z-10"> {/* Content on top of the background */}
        <h1 className="text-3xl font-bold mb-6">Welcome to Amblé Radio (Old Home)</h1>
        <div className="mb-4">
            <Button onClick={() => setCurrentProgramByIdAndPlay("program1")} className="mr-2">Play Morning Vibes</Button>
            <Button onClick={() => setCurrentProgramByIdAndPlay("program2")} className="mr-2">Play Tech Talk</Button>
            <Button onClick={() => setCurrentAdvertisementById("ad1")}>Show Ad 1</Button>
        </div>

        {/* Retain the layout of cards for this page */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Placeholder or specific content for Index */}
          <div className="md:col-span-1 space-y-4">
            <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
              <h2 className="text-xl font-semibold mb-2">Current Stream</h2>
              {currentTrack && playerMode === 'live' ? (
                <div>
                  <h3 className="text-lg">{currentTrack.title}</h3>
                  <p className="text-sm text-white/80">{currentTrack.artist}</p>
                  {currentTrack.imageUrl && <img src={currentTrack.imageUrl} alt={currentTrack.title} className="mt-2 rounded w-full object-cover h-40"/>}
                </div>
              ) : (
                <p>No live stream currently selected or playing via this page's direct actions.</p>
              )}
            </Card>
             {currentAdvertisement && (
                <Card className="bg-black/40 backdrop-blur-md border-white/10 p-0 overflow-hidden">
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
          </div>

          {/* Column 2 & 3: Existing card layout from original Index */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Schedule Card */}
            <Card className="sm:col-span-2 bg-black/40 backdrop-blur-md border-white/10 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-white" />
                <h3 className="text-white font-semibold text-sm">Today's Schedule</h3>
              </div>
              {/* Schedule items... */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border-white/10">
                    <div><p className="text-white font-medium text-sm">Morning Vibes</p><p className="text-white/60 text-xs">Marco & Sofia</p></div>
                    <div className="text-right"><p className="text-white text-xs">06:00 - 10:00</p><div className="w-2 h-2 bg-green-500 rounded-full ml-auto"></div></div>
                </div>
                {/* More schedule items */}
              </div>
            </Card>

            {/* More Stats Cards */}
            <Card className="bg-black/40 backdrop-blur-md border-white/10 p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-green-500/20 rounded-lg flex items-center justify-center"><RadioIcon className="w-3 h-3 text-green-400" /></div>
                <span className="text-white/70 text-xs">Live Hours</span>
              </div>
              <p className="text-white text-lg font-bold">18</p><p className="text-green-400 text-xs">Daily avg</p>
            </Card>
            <Card className="bg-black/40 backdrop-blur-md border-white/10 p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center"><Heart className="w-3 h-3 text-orange-400" /></div>
                <span className="text-white/70 text-xs">Favorites</span>
              </div>
              <p className="text-white text-lg font-bold">1.2k</p><p className="text-orange-400 text-xs">This month</p>
            </Card>
            <Card className="sm:col-span-2 bg-black/40 backdrop-blur-md border-white/10 p-3">
              <h3 className="text-white font-semibold mb-3 text-sm">Recent Activity</h3>
              {/* Activity items... */}
               <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center"><RadioIcon className="w-3 h-3 text-white" /></div>
                        <div><p className="text-white text-xs">New episode available</p><p className="text-white/60 text-xs">Tech & Innovation - 2h ago</p></div>
                    </div>
                    {/* More activity */}
               </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

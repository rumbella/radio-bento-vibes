import { useState, useEffect, ReactNode } from "react";
import { Play, Pause, Heart, Mic, Radio, Users, Clock } from "lucide-react"; // Icons used in sidebars
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RadioPageLayout from "@/components/layout/RadioPageLayout";
import { Program, Advertisement, mockPrograms, mockAdvertisements } from "@/data/mockData"; // Updated import paths

// Mock Data definitions removed, now using imported ones.
// const mockPrograms: Program[] = [
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
]; // This closing bracket was for the local mockPrograms, which is now fully removed.

// const mockAdvertisements: Advertisement[] = [ // This local definition is also removed.
// ...
// ];

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
      {/* Left column is now empty as per user request */}
      <div className="w-1/4 grid grid-cols-2 gap-4">
        {/* This left column is now empty as per user request */}
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

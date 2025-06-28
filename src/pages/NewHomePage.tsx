import { useState, useEffect } from "react";
// ReactPlayer and its specific controls (Slider, VolumeX, SkipBack, SkipForward, Volume2) are moved to RadioPageLayout
import { Play, Pause, Heart, Mic, Radio, Users, Clock } from "lucide-react"; // Keep icons used in Index's direct children
import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card"; // Card is not used in the new layout
import RadioPageLayout from "@/components/layout/RadioPageLayout"; // Import the new layout
import LyricsPanel from "@/components/music/LyricsPanel";
import RelatedVideos from "@/components/music/RelatedVideos";
import PlayerBar from "@/components/music/PlayerBar"; // Assuming PlayerBar component will be created

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
    audioUrl: "https://mqugxowc-lbmedia.radioca.st/stream?type=http&nocache=43",
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

const NewHomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Controls UI elements in Index & passed to layout
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState("https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg");
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  // const [currentAdvertisement, setCurrentAdvertisement] = useState<Advertisement | null>(mockAdvertisements[0]); // Advertisement not used in new layout
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

  // const setCurrentAdvertisementById = (id: string) => { // Advertisement not used in new layout
  //   const ad = mockAdvertisements.find(a => a.id === id);
  //   if (ad) {
  //     setCurrentAdvertisement(ad);
  //   }
  // };

  useEffect(() => {
    // Set initial program when component mounts
    if (mockPrograms.length > 0 && !currentProgram) { // Ensure it only sets if not already set
      setCurrentProgram(mockPrograms[0]);
    }
  }, [currentProgram]); // Add currentProgram to dependency array to prevent re-setting if it's already set by other means.

  useEffect(() => {
    if (currentProgram) {
      // For the new layout, we might not want to change the main background image based on program,
      // as the main content area has its own image.
      // If a specific background for RadioPageLayout is still desired, this can be adjusted.
      // setBackground(currentProgram.imageUrl);
    }
  }, [currentProgram]);

  // useEffect(() => { // Advertisement not used in new layout
  //   if (currentAdvertisement && currentAdvertisement.videoUrl) {
  //     console.log("Current advertisement has video: ", currentAdvertisement.videoUrl);
  //   }
  // }, [currentAdvertisement]);

  // const headerActionButtons = ( // Header actions not specified for the new page
  //   <>
  //     <Button onClick={() => setCurrentProgramById("program2")} className="text-white hover:bg-white/10">Set P2</Button>
  //     <Button onClick={() => setCurrentProgramById("program3")} className="text-white hover:bg-white/10">Set P3</Button>
  //     <Button onClick={() => setCurrentAdvertisementById("ad1")} className="text-white hover:bg-white/10">Set Ad1</Button>
  //     <Button onClick={() => setCurrentAdvertisementById("ad2")} className="text-white hover:bg-white/10">Set Ad2</Button>
  //   </>
  // );

  return (
    <RadioPageLayout
      backgroundElement={
        // The main content will have its own background, so this might not be needed or could be a generic one.
        // For now, let's keep it simple and rely on the main content's background.
        // Or, we can set a default, less prominent background for the overall page layout.
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900"
        />
      }
      currentProgramForPlayer={currentProgram}
      // headerActions={headerActionButtons} // Header actions not specified for the new page
      isPlaying={isPlaying}
      onTogglePlay={togglePlay}
    >
      <main className="p-4 h-full flex flex-col text-white"> {/* Added text-white for default text color */}
        <div className="flex flex-grow space-x-4 overflow-hidden">
          <div className="relative flex-1">
            <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg" className="w-full h-full object-cover rounded-lg" />
            <div className="absolute bottom-4 left-4 bg-black/60 p-4 rounded-lg">
              <p className="text-sm text-gray-300">Song</p>
              <h2 className="font-semibold">Free Fall (Visualizer) (feat. J. Cole)</h2>
              <p className="text-xs text-gray-400">Tems • Born in the Wild • 2024 • 4:15</p>
            </div>
          </div>
          <div className="w-2/5 flex flex-col space-y-4">
            <LyricsPanel />
            <RelatedVideos />
          </div>
        </div>
 
      </main>
    </RadioPageLayout>
  );
};

export default NewHomePage;

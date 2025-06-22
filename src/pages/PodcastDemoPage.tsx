import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Keep Card for potential use in right column
import RadioPageLayout from "@/components/layout/RadioPageLayout";
import { Program } from "./Index"; // Re-use Program interface

const PODCAST_TITLE = "Monicelli e Moretti Due Generazioni a Confronto";
const PODCAST_AUDIO_URL = "https://res.cloudinary.com/thinkdigital/video/upload/v1750623353/Monicelli_e_Moretti__Due_Generazioni_a_Confronto_jh37ll.wav";
const YOUTUBE_VIDEO_ID = "AIdMhQjCEeU";

const PodcastDemoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [podcastProgram, setPodcastProgram] = useState<Program | null>(null);

  useEffect(() => {
    setPodcastProgram({
      id: "podcast1",
      name: PODCAST_TITLE,
      host: "Podcast", // Artist/Host for the podcast
      imageUrl: "", // No specific image for podcast, background is video
      audioUrl: PODCAST_AUDIO_URL,
    });
  }, []);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const backgroundVideoElement = (
    <iframe
      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&mute=1&controls=0&showinfo=0&autohide=1&modestbranding=1`}
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
        pointerEvents: 'none', // Prevents iframe from capturing mouse events
      }}
      title="Podcast Background Video"
    ></iframe>
  );

  // No header actions needed for this page based on requirements
  const headerActionButtons = null;

  return (
    <RadioPageLayout
      backgroundElement={backgroundVideoElement}
      currentProgramForPlayer={podcastProgram} // This will provide audioUrl to the layout's player
      headerActions={headerActionButtons}
      isPlaying={isPlaying}
      onTogglePlay={togglePlay} // Connects layout's play/pause to this page's state
    >
      {/* Left column is empty, consistent with other pages */}
      <div className="w-1/4">
        {/* Empty left column */}
      </div>

      {/* Right Column: Podcast Player Card */}
      <div className="w-1/4 flex flex-col items-center justify-center"> {/* Simplified right column for the podcast player */}
        <Card className="bg-black/30 backdrop-blur-lg border-white/10 p-6 w-full max-w-md">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-white text-2xl font-bold text-center">{PODCAST_TITLE}</h2>
            <p className="text-white/70 text-sm">Click play to listen</p>
            <Button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
              size="icon"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </Button>
          </div>
        </Card>
      </div>
    </RadioPageLayout>
  );
};

export default PodcastDemoPage;

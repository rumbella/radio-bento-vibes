import React, { useEffect } from 'react';
import { usePlayerState, usePlayerActions } from '@/contexts/PlayerContext';
import LyricsPanel from '@/components/music/LyricsPanel';
import RelatedVideos from '@/components/music/RelatedVideos';
import { mockPrograms } from './Index'; // Assuming mockPrograms is still relevant for default content

// Remove local Program interface if it's identical to what PlayerContext might provide or handle internally
// export interface Program {
//   id: string;
//   name: string;
//   host: string;
//   imageUrl: string;
//   audioUrl: string;
// }

const NewHomePage: React.FC = () => {
  const { currentTrack } = usePlayerState();
  const { playStream } = usePlayerActions();

  // Effect to play a default stream when the page loads if nothing is playing
  // This logic might be better suited in PlayerProvider for a truly global default,
  // or if NewHomePage is THE landing page that should always start a stream.
  useEffect(() => {
    if (!currentTrack && mockPrograms.length > 0) {
      // Example: Play the first mock program if nothing is loaded yet.
      // Adjust this logic based on desired default behavior.
      // playStream(mockPrograms[0]);
    }
  }, [currentTrack, playStream]);

  // Use currentTrack from context for display
  const displayImageUrl = currentTrack?.imageUrl || "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg"; // Fallback image
  const displayTitle = currentTrack?.title || "Free Fall (Visualizer) (feat. J. Cole)"; // Fallback title
  const displayArtist = currentTrack?.artist || "Tems • Born in the Wild • 2024 • 4:15"; // Fallback artist info
  const songOrContentType = currentTrack?.originalProgram?.id || currentTrack?.id ? (currentTrack.playerMode === 'podcast' ? 'Podcast' : 'Song') : 'Song';


  return (

    // No RadioPageLayout here. MainLayout will wrap this page via App.tsx
    // The outer div helps to constrain the page content if MainLayout doesn't impose padding/margins on its children container
    <div className="p-4 h-full text-white"> {/* Ensure h-full if it's inside a flex container in MainLayout */}
      <div className="flex justify-between text-gray-400 mb-4">
        {/* These could be actual controls or just decorative */}
        <span>Minimize</span>
        <span>Full Screen</span>
      </div>
      {/* flex-grow and overflow-hidden should allow this container to fill space provided by MainLayout's main tag */}
      <div className="flex flex-grow space-x-4 overflow-hidden">
        <div className="relative flex-1">
          <img
            src={displayImageUrl}
            alt={displayTitle}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 p-4 rounded-lg">
            <p className="text-sm text-gray-300">{songOrContentType}</p>
            <h2 className="font-semibold text-lg">{displayTitle}</h2>
            <p className="text-xs text-gray-400">{displayArtist}</p>
          </div>
        </div>
        <div className="w-2/5 flex flex-col space-y-4">
          <LyricsPanel /> {/* LyricsPanel might also need to be dynamic based on currentTrack */}
          <RelatedVideos /> {/* RelatedVideos might also need to be dynamic */}
        </div>
      </div>
      {/* The PlayerBar component is removed from here, as it's now part of MainLayout's footer */}
    </div>

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

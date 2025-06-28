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
    // If no track is playing OR if the current track is not a live stream, play the default live stream.
    // This makes sure the homepage always tries to play live content.
    if (mockPrograms.length > 0 && (!currentTrack || currentTrack.playerMode !== 'live')) {
      // Check if mockPrograms[0] is already the current track to avoid restarting it if it was just paused.
      if (!currentTrack || currentTrack.id !== mockPrograms[0].id || currentTrack.playerMode !== 'live') {
        console.log("NewHomePage: Setting default live stream mockPrograms[0]");
        playStream(mockPrograms[0]);
      }
    }
  }, [currentTrack, playStream]);

  // Use currentTrack from context for display
  const displayImageUrl = currentTrack?.imageUrl || "https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg"; // Fallback image
  const displayTitle = currentTrack?.title || "Select a Stream"; // Fallback title
  const displayArtist = currentTrack?.artist || "Amblé Radio"; // Fallback artist info
  const songOrContentType = currentTrack?.playerMode === 'live' ? 'Live Stream' : (currentTrack?.playerMode === 'podcast' ? 'Podcast' : 'Song');


  return (
    // No RadioPageLayout here. MainLayout will wrap this page via App.tsx
    // The outer div helps to constrain the page content if MainLayout doesn't impose padding/margins on its children container
    <div className="p-4 h-full text-white"> {/* Ensure h-full if it's inside a flex container in MainLayout */}
   
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
  );
};

export default NewHomePage;

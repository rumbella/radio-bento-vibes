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
    const defaultLiveProgram = mockPrograms[0]; // Assuming mockPrograms is available and has at least one entry
    const { isPlaying, playerMode } = currentTrack || {}; // Destructure from currentTrack if it exists

    if (defaultLiveProgram) {
      // Condition 1: No track is currently loaded. Load and play default live stream.
      if (!currentTrack) {
        console.log("NewHomePage useEffect: No current track. Playing default live stream.");
        playStream(defaultLiveProgram);
      }
      // Condition 2: A track is loaded, but it's not the default live stream. Switch to default.
      else if (currentTrack.id !== defaultLiveProgram.id) {
        console.log("NewHomePage useEffect: Different track loaded. Switching to default live stream.");
        playStream(defaultLiveProgram);
      }
      // Condition 3: The current track IS the default live stream, but its mode is not 'live' (e.g., error occurred)
      // OR if it IS the default live stream, in 'live' mode, BUT isPlaying is false (meaning it was paused or stopped by error)
      // In this specific case for NewHomePage, we want to ensure it attempts to play if it's the designated page for live content.
      // However, this could override a user's explicit pause of the live stream if they are on NewHomePage.
      // Let's refine this: only auto-play if mode is wrong, or if it's the right track but wasn't playing due to an error (now resolved perhaps)
      // This part is tricky to not override user's pause action on the live stream itself.
      // The PlayerProvider's initial playStream handles the very first load.
      // This useEffect should mostly handle ensuring the *correct content* (default live) is loaded for NewHomePage.
      // The decision to auto-play it if it's already loaded but paused is debatable.
      // For now, let's ensure it loads the correct stream. PlayerProvider's playStream sets isPlaying=true.
      // If the user pauses *that stream*, togglePlay sets isPlaying=false. This effect should not then force it back to true.
      else if (currentTrack.id === defaultLiveProgram.id && playerMode !== 'live') {
         console.log("NewHomePage useEffect: Default live stream loaded but not in 'live' mode. Resetting.");
         playStream(defaultLiveProgram); // playStream will set it to 'live' and isPlaying to true
      }
      // If currentTrack.id === defaultLiveProgram.id AND playerMode === 'live', we do nothing.
      // This respects if the user paused the live stream while on NewHomePage.
    }
  }, [currentTrack, playStream]); // playStream is stable. currentTrack is the main dependency.

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

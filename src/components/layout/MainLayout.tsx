import React, { ReactNode, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MessageCircle, Radio } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PlayerProvider, usePlayerState, usePlayerActions } from '@/contexts/PlayerContext';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from '@/components/mobile/MobileNavbar'; // Assuming MobileMenu is suitable for reuse
import PlayerActionIcons from '@/components/mobile/PlayerActionIcons'; // Import the component

interface MainLayoutProps {
  children: ReactNode;
}

const SiteHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false); // For potential desktop dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Example auth state

  // Placeholder for actual auth logic
  const toggleAuth = () => setIsAuthenticated(prev => !prev);

  const handleCloseMobileMenu = () => setIsMobileMenuOpen(false);
  const handleCloseDesktopMenu = () => setIsDesktopMenuOpen(false);

  return (
    <>
      {/* Mobile Header & Menu */}
      {isMobile && (
        <>
          <div className="md:hidden fixed top-[5px] left-1/2 transform -translate-x-1/2 w-[90%] z-30">
            <div className="bg-black/50 backdrop-blur-md shadow-lg rounded-lg flex items-center p-2 justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s" // Replace with your logo
                    alt="Amblé Radio Logo"
                    className="w-8 h-6 object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="text-white font-bold text-sm">Amblé Radio</span>
                  <p className="text-white/70 text-xs">Sound & Podcasts</p>
                </div>
              </div>
              <Button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                variant="ghost"
                size="sm"
                className="font-medium py-1 bg-transparent px-[10px] text-xs text-white"
              >
                {isMobileMenuOpen ? "CLOSE" : "MENU"}
              </Button>
            </div>
          </div>
          <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
        </>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <header className="relative z-20 flex items-center justify-between p-5 bg-transparent text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s" // Replace with your logo
                alt="Amblé Radio Logo"
                className="w-10 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="font-bold text-xl">Amblé Radio</h1>
              <p className="text-white/70 text-sm">Fresh Sound & Podcasts</p>
            </div>
          </div>

          <nav className="flex-grow flex justify-center">
            <div className="flex space-x-1">
              <Link to="/"><Button variant="ghost" className="text-white hover:bg-white/10 text-sm">Home (Old)</Button></Link>
              <Link to="/new-home"><Button variant="ghost" className="text-white hover:bg-white/10 text-sm">Home</Button></Link>
              {/* Add other main navigation links here */}
              <Link to="/playlist"><Button variant="ghost" className="text-white hover:bg-white/10 text-sm">Playlist</Button></Link>
              <Link to="/podcast-demo"><Button variant="ghost" className="text-white hover:bg-white/10 text-sm">Podcast Demo</Button></Link>
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button onClick={toggleAuth} variant="ghost" className="text-white hover:bg-white/10 text-sm">Logout</Button>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
              </>
            ) : (
              <Button onClick={toggleAuth} variant="ghost" className="text-white hover:bg-white/10 text-sm">Login</Button>
            )}
            {/* Example Desktop Menu Toggle - if needed for a dropdown */}
            {/* <Button onClick={() => setIsDesktopMenuOpen(!isDesktopMenuOpen)} variant="ghost" className="text-white hover:bg-white/10">{isDesktopMenuOpen ? "CLOSE" : "MENU"}</Button> */}
          </div>
        </header>
      )}
       {/* Placeholder for a potential desktop dropdown menu, if MobileMenu is adapted or a new one is created */}
       {/* {!isMobile && isDesktopMenuOpen && <SomeDesktopMenuComponent onClose={handleCloseDesktopMenu} />} */}
    </>
  );
};

// Renamed to NewPlayerFooterContent to reflect the change, was PlayerFooterContent
const NewPlayerFooterContent: React.FC = () => {
  const {
    isPlaying,
    volume,
    muted,
    currentTrack,
    playerMode,
    currentPlaylistTracks
  } = usePlayerState();

  const {
    togglePlay,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack
  } = usePlayerActions();

  const isMobile = useIsMobile();

  // Placeholder actions, same as in RadioPageLayout
  const handleLikeClick = () => console.log("Like clicked - (NewPlayerFooterContent)");
  const handleMessageClickInBar = () => console.log("Message clicked in player bar - (NewPlayerFooterContent)");

  const displayTitle = currentTrack?.title || "Nessuna traccia";
  const displayArtist = currentTrack?.artist || "Radio Amblé";

  // Direct volume change handler for the slider
  const handleVolumeSliderChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
  };

  // Fixed class for the main div to match RadioPageLayout's player
  // It's no longer "mt-auto" as it's fixed, but the parent main tag has flex-col, so it should be fine.
  // The original RadioPageLayout player was `fixed bottom-0...`
  // The current PlayerFooterContent was `bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 text-white w-full mt-auto`
  // We'll use the fixed positioning and styling from RadioPageLayout's player.
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-20 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Track Info - No album art here, as per RadioPageLayout player bar design */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-white font-medium truncate w-48" title={displayTitle}>{displayTitle}</p>
            <p className="text-white/60 text-sm truncate w-48" title={displayArtist}>{displayArtist}</p>
          </div>
        </div>

        {/* Center: Controls - Matched styling from PlayerFooterContent for buttons, added SkipBack */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {(playerMode === 'playlist' || playerMode === 'podcast') && currentPlaylistTracks.length > 1 && (
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={prevTrack}>
              <SkipBack className="w-5 h-5" />
            </Button>
          )}
          <Button
            onClick={togglePlay}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black hover:bg-white/90 flex items-center justify-center"
          >
            {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />}
          </Button>
          {(playerMode === 'playlist' || playerMode === 'podcast') && currentPlaylistTracks.length > 1 && (
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={nextTrack}>
              <SkipForward className="w-5 h-5" />
            </Button>
          )}
        </div>

        {/* Right: Volume & Other Actions (Desktop) - Kept from RadioPageLayout player */}
        <div className={`items-center space-x-4 ${isMobile ? 'hidden' : 'flex'}`}>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleLikeClick}>
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleMessageClickInBar}>
            <MessageCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
            {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume]}
            onValueChange={handleVolumeSliderChange}
            max={1}
            step={0.01}
            className="w-20 h-1 bg-white/20 rounded-full [&>span:first-child]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};


const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentTrack, isPlaying, volume, muted, loop } = usePlayerState();
  const { handleProgress, handleDuration, handleEnded, handleError } = usePlayerActions(); // Import handleError
  const playerRef = useRef<ReactPlayer>(null);
  const isMobile = useIsMobile(); // Get mobile state for conditional rendering

  // Placeholder handlers for PlayerActionIcons
  const handleMobileLikeClick = () => {
    console.log("Mobile PlayerActionIcons: Like clicked");
  };

  const handleMobileMessageClick = () => {
    console.log("Mobile PlayerActionIcons: Message clicked");
  };

  // Sync playerRef with context if needed, though direct control is via context actions
  // This is primarily for the seekTo action in PlayerContext to access the player instance.
  // A more robust way might be to pass the ref to the context, but this is simpler for now.
   useState(() => {
    if (playerRef.current && usePlayerActions // Check if actions exist, implies context is ready
    ) {
      // Allow PlayerContext to access this ref if needed for direct manipulations like seek.
      // This is a bit of a workaround. Ideally, PlayerProvider itself would host ReactPlayer.
      // For now, let's assume PlayerContext's seekTo will update `playedSeconds` and ReactPlayer will catch up.
      // Or, we can enhance PlayerContext to accept a ref.
      // Let's move ReactPlayer here as it's part of the layout.
    }
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900 to-black flex flex-col">
      <SiteHeader />
      <main className="flex-grow relative z-10 pt-[60px] md:pt-0 flex flex-col"> {/* Ensure main can use flex-col for ordering */}
        <div className="flex-grow"> {/* This div will take up available space for page content */}
          {children}
        </div>
        {/* Player UI moved here, at the end of the main content flow */}
        <NewPlayerFooterContent />
        {/* Conditionally render PlayerActionIcons for mobile */}
        {isMobile && <PlayerActionIcons onLikeClick={handleMobileLikeClick} onMessageClick={handleMobileMessageClick} />}
      </main>
      {/* ReactPlayer remains a hidden utility component, not directly part of the visual layout flow here */}
      <ReactPlayer
          ref={playerRef}
          url={currentTrack?.audioUrl || undefined}
          playing={isPlaying}
          volume={volume}
          muted={muted}
          loop={loop}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onPlay={() => console.log("ReactPlayer: onPlay event. Context isPlaying:", isPlaying, "URL:", currentTrack?.audioUrl)}
          onPause={() => console.log("ReactPlayer: onPause event. Context isPlaying:", isPlaying)}
          onError={handleError} // Use context's handleError
          width="0"
          height="0"
          config={{ file: { forceAudio: true } }} // Ensures it's treated as audio
        />
    </div>
  );
};

// The MainLayout component that wraps everything with the PlayerProvider
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <PlayerProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </PlayerProvider>
  );
};

export default MainLayout;

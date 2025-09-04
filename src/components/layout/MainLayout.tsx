import React, { ReactNode, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, MessageCircle, Radio } from 'lucide-react';
import ReactPlayer from 'react-player';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PlayerProvider, usePlayerState, usePlayerActions } from '@/contexts/PlayerContext';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileMenu from '@/components/mobile/MobileNavbar'; // Assuming MobileMenu is suitable for reuse
// import PlayerActionIcons from '@/components/mobile/PlayerActionIcons'; // This was specific to RadioPageLayout's old structure

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

const PlayerFooterContent: React.FC = () => {
  const { isPlaying, volume, muted, currentTrack, playerMode, playedSeconds, duration, currentPlaylistTracks } = usePlayerState();
  const { togglePlay, setVolume, toggleMute, seekTo, nextTrack, prevTrack } = usePlayerActions();
  const isMobile = useIsMobile();

  console.log('PlayerFooterContent rendering, isPlaying:', isPlaying, 'currentTrack:', currentTrack?.title);


  const formatTime = (seconds: number) => {
    const date = new Date(0);
    date.setSeconds(seconds || 0);
    return date.toISOString().substr(14, 5); // MM:SS
  };

  return (
    // Apply requested styles: bg-black/80 backdrop-blur-xl border-t border-white/10 p-4
    // Retain w-full and mt-auto for positioning within the flex layout. z-20 omitted as it's in normal flow.
    <div className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 text-white w-full mt-auto min-h-[120px] lg:min-h-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Track Info & Progress Bar */}
        <div className="flex items-center space-x-3 w-1/3 min-w-0">
          {currentTrack?.imageUrl && (
            <img src={currentTrack.imageUrl} alt={currentTrack.title} className="w-10 h-10 rounded object-cover" />
          )}
          {!currentTrack?.imageUrl && <div className="w-10 h-10 rounded bg-neutral-700 flex items-center justify-center"><Radio size={20} /></div>}
          <div>
            <p className="font-semibold text-sm truncate w-40 md:w-60" title={currentTrack?.title}>{currentTrack?.title || "Nessuna traccia"}</p>
            <p className="text-xs text-white/70 truncate w-40 md:w-60" title={currentTrack?.artist}>{currentTrack?.artist || "Radio Amblé"}</p>
          </div>
        </div>

        {/* Center: Controls & Seek Bar */}
        <div className="flex flex-col items-center flex-grow mx-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {(playerMode === 'playlist' || playerMode === 'podcast') && currentPlaylistTracks.length > 1 && (
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={prevTrack}>
                <SkipBack className="w-5 h-5" />
              </Button>
            )}
            <Button onClick={togglePlay} className="w-16 h-16 rounded-full bg-transparent border-[1.5px] border-white text-white flex items-center justify-center">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </Button>
            {/* DEBUG: Display isPlaying state */}
            <span className="text-xs text-cyan-400 ml-2">DBG: isPlaying: {isPlaying.toString()}</span>
            {(playerMode === 'playlist' || playerMode === 'podcast') && currentPlaylistTracks.length > 1 && (
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white" onClick={nextTrack}>
                <SkipForward className="w-5 h-5" />
              </Button>
            )}
          </div>
          {!isMobile && duration > 0 && playerMode !== 'live' && ( // Hide seek bar for live streams as duration is often 0 or irrelevant
            <div className="w-full max-w-xs lg:max-w-md flex items-center space-x-2 mt-1">
              <span className="text-xs text-white/70 w-8">{formatTime(playedSeconds)}</span>
              <Slider
                value={[playedSeconds]}
                max={duration}
                step={1}
                onValueChange={(value) => seekTo(value[0])}
                className="w-full h-1.5 bg-white/20 rounded-full [&>span:first-child]:bg-white"
              />
              <span className="text-xs text-white/70 w-8">{formatTime(duration)}</span>
            </div>
          )}
        </div>

        {/* Right: Volume & Other Actions (Desktop) */}
        <div className={`items-center space-x-2 w-1/3 justify-end ${isMobile ? 'hidden' : 'flex'}`}>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
            <MessageCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white/70 hover:text-white">
            {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Slider
            value={[muted ? 0 : volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={1}
            step={0.01}
            className="w-20 h-1.5 bg-white/20 rounded-full [&>span:first-child]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};


const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  // ReactPlayer instance and its direct state dependencies (currentTrack, isPlaying, etc.)
  // are now managed within PlayerProvider.
  // MainLayoutContent remains responsible for rendering the site structure and PlayerFooterContent.

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-900 to-black flex flex-col">
      <SiteHeader />
      <main className="flex-grow relative z-10 pt-[60px] md:pt-0 flex flex-col"> {/* Ensure main can use flex-col for ordering */}
        <div className="flex-grow"> {/* This div will take up available space for page content */}
          {children}
        </div>
        {/* Player UI moved here, at the end of the main content flow */}
        <PlayerFooterContent />
      </main>
      {/* ReactPlayer has been moved to PlayerContext.tsx to ensure the context's playerRef is used. */}
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

import { useState, useRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Radio, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Program } from "@/pages/Index";
import { Playlist } from "@/data/playlists";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/components/mobile/MobileNavbar";
import PlayerActionIcons from "@/components/mobile/PlayerActionIcons";
export interface RadioPageLayoutProps {
  backgroundElement: ReactNode;
  children: ReactNode;
  currentProgramForPlayer?: Program | null;
  headerActions?: ReactNode;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playerMode?: 'live' | 'playlist';
  playlist?: Playlist | null;
  currentTrackIndexInPlaylist?: number;
  onNextTrack?: () => void;
  onPrevTrack?: () => void;
}
const RadioPageLayout: React.FC<RadioPageLayoutProps> = ({
  backgroundElement,
  children,
  currentProgramForPlayer,
  headerActions,
  isPlaying,
  onTogglePlay,
  playerMode = 'live',
  playlist,
  currentTrackIndexInPlaylist,
  onNextTrack,
  onPrevTrack
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0]);
    setMuted(false);
  };
  const toggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    if (!newMuted && volume === 0) {
      setVolume(0.5);
    }
  };
  const handleLikeClick = () => {
    console.log("Like clicked - funzione da implementare");
  };
  const handleMessageClick = () => {
    console.log("Message clicked - funzione da implementare");
  };

  const handleMessageClickInBar = () => {
    console.log("Message clicked in player bar - funzione da implementare");
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  let audioUrl = "";
  let currentTrackTitle = currentProgramForPlayer?.name || "Live Stream";
  let currentTrackArtist = currentProgramForPlayer?.host || "Radio Amblé";
  if (playerMode === 'playlist' && playlist && currentTrackIndexInPlaylist !== undefined && currentTrackIndexInPlaylist >= 0 && currentTrackIndexInPlaylist < playlist.tracks.length) {
    const track = playlist.tracks[currentTrackIndexInPlaylist];
    audioUrl = track.audioUrl;
    currentTrackTitle = track.title;
    currentTrackArtist = track.artist;
  } else {
    audioUrl = currentProgramForPlayer?.audioUrl || "";
  }
  const handleEnded = () => {
    if (playerMode === 'playlist' && onNextTrack) {
      onNextTrack();
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900 relative overflow-hidden">
      {backgroundElement}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0"></div>

      <ReactPlayer ref={playerRef} url={audioUrl} playing={isPlaying} volume={volume} muted={muted} controls={false} width="0px" height="0px" onPlay={() => {
      if (!isPlaying) onTogglePlay();
    }} onPause={() => {
      if (isPlaying) onTogglePlay();
    }} onEnded={handleEnded} />

      {/* Mobile Menu Toggle Button and Menu */}
      {isMobile && (
        <>
          <div className="fixed top-4 right-4 z-50">
            <Button
              onClick={() => setIsMobileMenuOpen(true)}
              variant="outline" // Changed for better visibility
              size="icon"
              className="text-white bg-neutral-900 hover:bg-neutral-700 border-neutral-700" // Style for visibility
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </Button>
          </div>
          <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />
        </>
      )}

      {/* Desktop Header */}
      {!isMobile && <header className="relative z-10 flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6RFZ_DjLPAbpKy6YRptoo6QFCSVF3PFLNLQ&s" alt="Amblé Radio" className="w-10 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">Amblé Radio</h1>
              <p className="text-white/70 text-sm">Fresh Sound & Podcasts</p>
            </div>
          </div>
          <nav className="flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:bg-white/10">Live</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">Podcasts</Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">Schedule</Button>

            <Link to="/"><Button variant="ghost" className="text-white hover:bg-white/10">Image BG</Button></Link>
            <Link to="/sponsor-video"><Button variant="ghost" className="text-white hover:bg-white/10">Video BG</Button></Link>
            <Link to="/program-slideshow"><Button variant="ghost" className="text-white hover:bg-white/10">Slideshow BG</Button></Link>
            <Link to="/playlist"><Button variant="ghost" className="text-white hover:bg-white/10">Playlist</Button></Link>

            {headerActions}
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
          </nav>
        </header>}

      {/* Main Content Grid - Hidden on mobile */}
      {!isMobile && <div className="relative z-10 flex justify-between h-[calc(100vh-200px)] px-12">
          {children}
        </div>}

      {/* Mobile Action Icons */}
      {isMobile && <PlayerActionIcons onLikeClick={handleLikeClick} onMessageClick={handleMessageClick} />}

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-white font-medium truncate w-48" title={currentTrackTitle}>{currentTrackTitle}</p>
              <p className="text-white/60 text-sm truncate w-48" title={currentTrackArtist}>{currentTrackArtist}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            
            <Button onClick={onTogglePlay} className="w-12 h-12 rounded-full bg-white text-black hover:bg-white/90">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={playerMode === 'playlist' ? onNextTrack : undefined} disabled={playerMode !== 'playlist' || !onNextTrack}>
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          <div className={`items-center space-x-4 ${isMobile ? 'hidden' : 'flex'}`}>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleMessageClickInBar}>
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/10">
              {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Slider value={[muted ? 0 : volume]} onValueChange={handleVolumeChange} max={1} step={0.01} className="w-20 h-1 bg-white/20 rounded-full [&>span:first-child]:bg-white" />
          </div>
        </div>
      </div>
    </div>;
};
export default RadioPageLayout;
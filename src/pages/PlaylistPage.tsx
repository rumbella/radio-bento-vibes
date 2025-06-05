import { useState, useEffect, ReactNode } from "react";
import RadioPageLayout from "@/components/layout/RadioPageLayout";
import { Program, Advertisement, mockPrograms, mockAdvertisements } from "./Index"; // Import Program, Ad interfaces and mockData
import { mockPlaylists, Playlist, Track } from "@/data/playlists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, Clock, ListMusic, Users, Radio as RadioIcon } from "lucide-react"; // Added ListMusic, RadioIcon (renamed)

const PlaylistPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null); // Fallback for 'live' mode or if no playlist track
  const [currentAdvertisement, setCurrentAdvertisement] = useState<Advertisement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(mockPrograms[0]?.imageUrl || "https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg");

  const [playerMode, setPlayerMode] = useState<'live' | 'playlist'>('playlist'); // Default to playlist mode for this page
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    if (playerMode === 'live' && selectedPlaylist && selectedPlaylist.tracks.length > 0 && !isPlaying) {
      // If switching from live mode to playing a playlist, start with the current/first track.
      // Or if was paused in playlist mode, just resume.
      setPlayerMode('playlist');
      // playTrack(currentTrackIndex); // Let onTogglePlay in layout handle this via isPlaying prop
    }
  };

  const playTrack = (index: number) => {
    if (selectedPlaylist && index >= 0 && index < selectedPlaylist.tracks.length) {
      setCurrentTrackIndex(index);
      setPlayerMode('playlist');
      setIsPlaying(true);
      // Update currentProgram as a way to pass track details to player if needed,
      // or rely on RadioPageLayout to use playlist props.
      // For now, RadioPageLayout handles it directly via playlist props.
      const track = selectedPlaylist.tracks[index];
      console.log("Playing track from playlist:", track.title);
    }
  };

  const nextTrack = () => {
    if (selectedPlaylist) {
      const newIndex = (currentTrackIndex + 1) % selectedPlaylist.tracks.length;
      playTrack(newIndex);
    }
  };

  const prevTrack = () => {
    if (selectedPlaylist) {
      const newIndex = (currentTrackIndex - 1 + selectedPlaylist.tracks.length) % selectedPlaylist.tracks.length;
      playTrack(newIndex);
    }
  };

  useEffect(() => {
    if (mockPlaylists.length > 0 && !selectedPlaylist) {
      setSelectedPlaylist(mockPlaylists[0]);
    }
    if (mockPrograms.length > 0 && !currentProgram) {
      setCurrentProgram(mockPrograms[0]); // Default program for the main player
    }
    // Initialize currentAdvertisement (copied from Index.tsx's logic)
    // This would require importing mockAdvertisements from Index.tsx or a shared file
    if (mockAdvertisements.length > 0 && !currentAdvertisement) {
      setCurrentAdvertisement(mockAdvertisements[0]);
    }
  }, [selectedPlaylist, currentProgram, currentAdvertisement]);

  const backgroundElement = (
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${currentBackgroundImage}')` }}
    />
  );

  // Placeholder header actions for playlist page
  const headerActionButtons = (
    <>
      <Button variant="ghost" className="text-white hover:bg-white/10">Playlists</Button>
      {mockPlaylists.length > 1 &&
        <Button onClick={() => setSelectedPlaylist(mockPlaylists[1])} className="text-white hover:bg-white/10">
          Load Playlist 2
        </Button>
      }
    </>
  );

  return (
    <RadioPageLayout
      backgroundElement={backgroundElement}
      currentProgramForPlayer={currentProgram} // This will play the "station" or last played track
      headerActions={headerActionButtons}
      isPlaying={isPlaying}
      onTogglePlay={togglePlay}
    >
      {/* Left Sidebar: Playlist Display */}
      <div className="w-1/4 flex flex-col gap-4">
        <Card className="bg-black/30 backdrop-blur-lg border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ListMusic /> {selectedPlaylist ? selectedPlaylist.name : "No Playlist Selected"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPlaylist ? (
              <ScrollArea className="h-[calc(100vh-300px)]"> {/* Adjust height as needed */}
                <div className="space-y-3 pr-4">
                  {selectedPlaylist.tracks.map((track) => (
                  {selectedPlaylist.tracks.map((track, index) => (
                    <div key={track.id} className="flex items-center space-x-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                      {track.imageUrl ? (
                        <img src={track.imageUrl} alt={track.title} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                          <ListMusic size={20} className="text-white/50" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white truncate">{track.title}</p>
                        <p className="text-xs text-white/70 truncate">{track.artist}</p>
                      </div>
                      {track.duration && <p className="text-xs text-white/50 mr-2">{track.duration}</p>}
                      <Button variant="ghost" size="icon" onClick={() => playTrack(index)} className="text-white hover:bg-white/20">
                        {/* Icon could change based on if this track is the one playing */}
                        <Play size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <p className="text-white/70">Select a playlist to view tracks.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar: Placeholder content similar to Index.tsx */}
      <div className="w-1/4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current "Station" Info (Placeholder for Playlist Page) */}
        <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <RadioIcon className="w-4 h-4 text-white" />
            <h3 className="text-white font-semibold text-sm">Current Station (Fallback)</h3>
          </div>
          <p className="text-white/70 text-xs">
            {currentProgram ? `${currentProgram.name} - ${currentProgram.host}` : "No station active"}
          </p>
        </Card>

        {/* Advertisement Card (Placeholder) */}
        {currentAdvertisement && (
            <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-0 overflow-hidden">
                 <a href={currentAdvertisement.targetUrl} target="_blank" rel="noopener noreferrer">
                    <img src={currentAdvertisement.imageUrl} alt={currentAdvertisement.name} className="w-full h-auto object-cover"/>
                </a>
                <div className="p-3"><p className="text-white text-xs font-medium truncate">{currentAdvertisement.name}</p></div>
            </Card>
        )}
        {!currentAdvertisement && (
             <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4 flex items-center justify-center">
                <p className="text-white/70 text-sm">No Ad</p>
            </Card>
        )}

        {/* Schedule Card (Placeholder) */}
        <Card className="col-span-1 md:col-span-2 bg-black/30 backdrop-blur-lg border-white/10 p-4">
            <div className="flex items-center space-x-2 mb-3"><Clock className="w-4 h-4 text-white" /><h3 className="text-white font-semibold text-sm">Upcoming</h3></div>
            <p className="text-white/70 text-xs">Playlist mode active. Station schedule paused.</p>
        </Card>
      </div>
    </RadioPageLayout>
  );
};

export default PlaylistPage;

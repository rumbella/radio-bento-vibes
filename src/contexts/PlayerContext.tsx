import React, { createContext, useContext, useState, useRef, ReactNode, useCallback } from 'react';
import ReactPlayer from 'react-player';
import { Program, mockPrograms } from '@/pages/Index'; // Assuming Program and mockPrograms are needed for default state

export type PlayerMode = 'live' | 'playlist' | 'podcast' | null;

export interface TrackInfo {
  id: string;
  title: string;
  artist?: string;
  imageUrl?: string;
  audioUrl: string;
  originalProgram?: Program; // To store the original program if it's from mockPrograms
}

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  duration: number;
  playedSeconds: number;
  loadedSeconds: number;
  seeking: boolean;
  currentTrack: TrackInfo | null;
  playerMode: PlayerMode;
  loop: boolean;
  currentPlaylistTracks: TrackInfo[];
  currentTrackIndexInPlaylist: number | null;
}

interface PlayerActions {
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (seconds: number) => void;
  playStream: (program: Program) => void;
  playPlaylistTrack: (track: TrackInfo, playlist: TrackInfo[], initialIndex: number) => void;
  playPodcastEpisode: (episode: TrackInfo, series?: TrackInfo[], initialIndex?: number) => void; // series and index for podcast
  handleProgress: (progress: { playedSeconds: number; loadedSeconds: number }) => void;
  handleDuration: (duration: number) => void;
  handleEnded: () => void;
  handleError: (error: any) => void; // Add error handler
  nextTrack: () => void;
  prevTrack: () => void;
}

const PlayerStateContext = createContext<PlayerState | undefined>(undefined);
const PlayerActionsContext = createContext<PlayerActions | undefined>(undefined);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [loadedSeconds, setLoadedSeconds] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<TrackInfo | null>(null);
  const [playerMode, setPlayerMode] = useState<PlayerMode>(null);
  const [loop, setLoop] = useState(false);
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = useState<TrackInfo[]>([]);
  const [currentTrackIndexInPlaylist, setCurrentTrackIndexInPlaylist] = useState<number | null>(null);


  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const internalSetVolume = useCallback((vol: number) => {
    setVolume(vol);
    setMuted(vol === 0);
  }, []);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      if (!prev && volume === 0) setVolume(0.5); // Unmute to default if volume was 0
      return !prev;
    });
  }, [volume]);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, 'seconds');
    setPlayedSeconds(seconds);
  }, []);

  const playStream = useCallback((program: Program) => {
    setCurrentTrack({
      id: program.id,
      title: program.name,
      artist: program.host,
      imageUrl: program.imageUrl,
      audioUrl: program.audioUrl,
      originalProgram: program,
    });
    setPlayerMode('live');
    setIsPlaying(true);
    setPlayerMode('live');
    setIsPlaying(true);
    setLoop(false);
    setCurrentPlaylistTracks([]);
    setCurrentTrackIndexInPlaylist(null);
  }, []);

  const playPlaylistTrack = useCallback((track: TrackInfo, playlist: TrackInfo[], initialIndex: number) => {
    setCurrentTrack(track);
    setCurrentPlaylistTracks(playlist);
    setCurrentTrackIndexInPlaylist(initialIndex);
    setPlayerMode('playlist');
    setIsPlaying(true);
    setLoop(false);
  }, []);

  const playPodcastEpisode = useCallback((episode: TrackInfo, series?: TrackInfo[], initialIndex?: number) => {
    setCurrentTrack(episode);
    // Assuming a podcast series is also a list of 'TrackInfo' like objects
    setCurrentPlaylistTracks(series || [episode]); // If no series, playlist is just the episode
    setCurrentTrackIndexInPlaylist(initialIndex !== undefined ? initialIndex : 0);
    setPlayerMode('podcast');
    setIsPlaying(true);
    setLoop(false);
  }, []);

  const nextTrackInternal = useCallback(() => {
    if ((playerMode === 'playlist' || playerMode === 'podcast') && currentPlaylistTracks.length > 0 && currentTrackIndexInPlaylist !== null) {
      const nextIndex = (currentTrackIndexInPlaylist + 1) % currentPlaylistTracks.length;
      setCurrentTrack(currentPlaylistTracks[nextIndex]);
      setCurrentTrackIndexInPlaylist(nextIndex);
      setIsPlaying(true); // Auto-play next track
    }
  }, [playerMode, currentPlaylistTracks, currentTrackIndexInPlaylist]);

  const prevTrackInternal = useCallback(() => {
    if ((playerMode === 'playlist' || playerMode === 'podcast') && currentPlaylistTracks.length > 0 && currentTrackIndexInPlaylist !== null) {
      const prevIndex = (currentTrackIndexInPlaylist - 1 + currentPlaylistTracks.length) % currentPlaylistTracks.length;
      setCurrentTrack(currentPlaylistTracks[prevIndex]);
      setCurrentTrackIndexInPlaylist(prevIndex);
      setIsPlaying(true); // Auto-play previous track
    }
  }, [playerMode, currentPlaylistTracks, currentTrackIndexInPlaylist]);

  const nextTrack = useCallback(() => {
    nextTrackInternal();
  }, [nextTrackInternal]);

  const prevTrack = useCallback(() => {
    prevTrackInternal();
  }, [prevTrackInternal]);


  const handleProgress = useCallback((progress: { playedSeconds: number; loadedSeconds: number }) => {
    if (!seeking) {
      setPlayedSeconds(progress.playedSeconds);
    }
    setLoadedSeconds(progress.loadedSeconds);
  }, [seeking]);

  const handleDuration = useCallback((dur: number) => {
    setDuration(dur);
  }, []);

  const handleEnded = useCallback(() => {
    if (playerMode === 'playlist' || playerMode === 'podcast') {
      if (loop && currentPlaylistTracks.length === 1) { // If looping a single track playlist/podcast
        playerRef.current?.seekTo(0);
        setIsPlaying(true);
      } else if (!loop) { // If not looping the whole playlist (loop prop on ReactPlayer handles that)
        nextTrackInternal(); // Go to next track
      }
      // If ReactPlayer's loop prop is true, it handles playlist loop automatically.
      // This handleEnded is more for custom behavior like "play next then stop" or single track loop.
    } else if (playerMode === 'live') {
      console.log("Live stream ended or was interrupted.");
       setIsPlaying(false); // Stop playing if live stream ends
    }
  }, [playerMode, loop, nextTrackInternal, currentPlaylistTracks.length]);

  const handleError = useCallback((error: any) => {
    console.error("PlayerContext: ReactPlayer error:", error);
    setIsPlaying(false); // Set isPlaying to false on error
  }, []);


  // Load a default stream on mount
  // Using useEffect for initialization that depends on playStream
  React.useEffect(() => {
    // This effect runs once on mount to potentially initialize a default stream.
    // Currently, auto-play is disabled. Uncomment playStream to enable.
    if (mockPrograms.length > 0 && !currentTrack && playerMode !== 'live') { // Check playerMode to avoid re-triggering if already live
      console.log("PlayerProvider: Initializing default stream with mockPrograms[0].");
      playStream(mockPrograms[0]); // Auto-play first mock program - Uncomment to enable
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playStream]); // Added playStream to dependency array as it's used in the effect. It's memoized via useCallback.


  const stateValue: PlayerState = {
    isPlaying,
    volume,
    muted,
    duration,
    playedSeconds,
    loadedSeconds,
    seeking,
    currentTrack,
    playerMode,
    loop,
    currentPlaylistTracks,
    currentTrackIndexInPlaylist,
  };

  const actionsValue: PlayerActions = {
    togglePlay,
    setVolume: internalSetVolume,
    toggleMute,
    seekTo,
    playStream,
    playPlaylistTrack,
    playPodcastEpisode,
    handleProgress,
    handleDuration,
    handleEnded,
    handleError, // Add handleError to actions
    nextTrack,
    prevTrack,
  };

  return (
    <PlayerStateContext.Provider value={stateValue}>
      <PlayerActionsContext.Provider value={actionsValue}>
        {children}
        {/* Hidden ReactPlayer, controlled by context. To be moved to MainLayout */}
        {/* <ReactPlayer
          ref={playerRef}
          url={currentTrack?.audioUrl || undefined}
          playing={isPlaying}
          volume={volume}
          muted={muted}
          loop={loop}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          onError={(e) => console.error('ReactPlayer Error:', e)}
          width="0"
          height="0"
          config={{ file: { forceAudio: true } }}
        /> */}
      </PlayerActionsContext.Provider>
    </PlayerStateContext.Provider>
  );
};

export const usePlayerState = (): PlayerState => {
  const context = useContext(PlayerStateContext);
  if (context === undefined) {
    throw new Error('usePlayerState must be used within a PlayerProvider');
  }
  return context;
};

export const usePlayerActions = (): PlayerActions => {
  const context = useContext(PlayerActionsContext);
  if (context === undefined) {
    throw new Error('usePlayerActions must be used within a PlayerProvider');
  }
  return context;
};

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
}

interface PlayerActions {
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (seconds: number) => void;
  playStream: (program: Program) => void;
  playPlaylistTrack: (track: TrackInfo, playlist?: TrackInfo[]) => void; // playlist is optional for now
  playPodcastEpisode: (episode: TrackInfo) => void;
  handleProgress: (progress: { playedSeconds: number; loadedSeconds: number }) => void;
  handleDuration: (duration: number) => void;
  handleEnded: () => void;
  // TODO: nextTrack, prevTrack for playlist/podcast series
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
  const [loop, setLoop] = useState(false); // Example: for single track loop

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
    setLoop(false);
  }, []);

  const playPlaylistTrack = useCallback((track: TrackInfo, playlist?: TrackInfo[]) => {
    setCurrentTrack(track);
    setPlayerMode('playlist');
    setIsPlaying(true);
    setLoop(false);
    // TODO: Set current playlist for next/prev functionality
  }, []);

  const playPodcastEpisode = useCallback((episode: TrackInfo) => {
    setCurrentTrack(episode);
    setPlayerMode('podcast');
    setIsPlaying(true);
    setLoop(false);
     // TODO: Set current podcast series for next/prev functionality
  }, []);

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
      // TODO: Implement nextTrack logic here
      console.log(`${playerMode} track ended, implement next track.`);
      // For now, just stop playing
      // setIsPlaying(false);
    } else if (playerMode === 'live') {
      // Live streams might try to reconnect or just stop.
      // Or, if it's a finite live event, it ends.
      console.log("Live stream ended or was interrupted.");
      setIsPlaying(false);
    }
     // If loop is true for a single track, ReactPlayer's loop prop handles it.
  }, [playerMode]);


  // Load a default stream on mount
  // Using useEffect for initialization that depends on playStream
  React.useEffect(() => {
    // This effect runs once on mount to potentially initialize a default stream.
    // Currently, auto-play is disabled. Uncomment playStream to enable.
    if (mockPrograms.length > 0 && !currentTrack && playerMode !== 'live') { // Check playerMode to avoid re-triggering if already live
      // console.log("PlayerProvider: Initializing default stream.");
      // playStream(mockPrograms[0]); // Auto-play first mock program - Uncomment to enable
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount. playStream is memoized with useCallback. currentTrack check prevents re-triggering.


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

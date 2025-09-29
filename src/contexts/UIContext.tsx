import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { HeroSlide } from '../components/HeroSection';
import { Playlist } from '../types';

interface UIState {
  showVideo: boolean;
  videoSrc: string;
  slides: HeroSlide[];
  playlists: Playlist[];
  isLoading: boolean;
  error: string | null;
}

interface UIActions {
  toggleShowVideo: () => void;
  setVideoSrc: (url: string) => void;
  setSlides: (slides: HeroSlide[]) => void;
  setPlaylists: (playlists: Playlist[]) => void;
}

const UIStateContext = createContext<UIState | undefined>(undefined);
const UIActionsContext = createContext<UIActions | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const settingsUrl = `${import.meta.env.VITE_API_BASE_URL}/api/settings`;
      const playlistsUrl = `${import.meta.env.VITE_API_BASE_URL}/api/playlists`;
      try {
        const [settingsResponse, playlistsResponse] = await Promise.all([
          fetch(settingsUrl),
          fetch(playlistsUrl),
        ]);

        if (!settingsResponse.ok || !playlistsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const settingsData = await settingsResponse.json();
        const playlistsData = await playlistsResponse.json();

        setShowVideo(settingsData.showVideo);
        setVideoSrc(settingsData.videoSrc);
        setSlides(settingsData.slides);
        setPlaylists(playlistsData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data. Please ensure the backend server is running.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleShowVideo = () => setShowVideo(prev => !prev);

  const state: UIState = { showVideo, videoSrc, slides, playlists, isLoading, error };
  const actions: UIActions = {
    toggleShowVideo,
    setVideoSrc,
    setSlides,
    setPlaylists,
  };

  return (
    <UIStateContext.Provider value={state}>
      <UIActionsContext.Provider value={actions}>
        {children}
      </UIActionsContext.Provider>
    </UIStateContext.Provider>
  );
};

// 4. Create custom hooks for easy access
export const useUIState = (): UIState => {
  const context = useContext(UIStateContext);
  if (context === undefined) {
    throw new Error('useUIState must be used within a UIProvider');
  }
  return context;
};

export const useUIActions = (): UIActions => {
  const context = useContext(UIActionsContext);
  if (context === undefined) {
    throw new Error('useUIActions must be used within a UIProvider');
  }
  return context;
};
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { HeroSlide } from '../components/HeroSection';

interface UIState {
  showVideo: boolean;
  videoSrc: string;
  slides: HeroSlide[];
  isLoading: boolean;
  error: string | null;
}

interface UIActions {
  toggleShowVideo: () => void;
  setVideoSrc: (url: string) => void;
  setSlides: (slides: HeroSlide[]) => void;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const apiUrl = baseUrl ? `${baseUrl}/api/settings` : 'http://localhost:3001/api/settings';

      if (!baseUrl) {
          console.warn("VITE_API_BASE_URL is not set. Defaulting to localhost. This is expected for local development.");
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Network response was not ok (status: ${response.status})`);
        }
        const data = await response.json();
        setShowVideo(data.showVideo);
        setVideoSrc(data.videoSrc);
        setSlides(data.slides);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        const debugMessage = `Failed to load settings from: ${apiUrl}.

        Troubleshooting tips:
        1. If you are running locally, ensure the backend server is active ('cd backend && npm start').
        2. If this is a deployed site, ensure the VITE_API_BASE_URL environment variable is set correctly in your hosting provider's settings and that you have redeployed the frontend.`;
        setError(debugMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const toggleShowVideo = () => setShowVideo(prev => !prev);

  const state: UIState = { showVideo, videoSrc, slides, isLoading, error };
  const actions: UIActions = {
    toggleShowVideo,
    setVideoSrc,
    setSlides,
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
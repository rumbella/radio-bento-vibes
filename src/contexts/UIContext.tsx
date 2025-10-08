import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { HeroSlide } from '../components/HeroSection';

interface UIState {
  showVideo: boolean;
  videoSrc: string;
  slides: HeroSlide[];
  isLoading: boolean;
  error: string | null;
  isResidentsModalOpen: boolean;
}

interface UIActions {
  toggleShowVideo: () => void;
  setVideoSrc: (url: string) => void;
  setSlides: (slides: HeroSlide[]) => void;
  toggleResidentsModal: () => void;
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
  const [isResidentsModalOpen, setIsResidentsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/settings`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShowVideo(data.showVideo);
        setVideoSrc(data.videoSrc);
        setSlides(data.slides);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        setError('Failed to load settings. Please ensure the backend server is running.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const toggleShowVideo = () => setShowVideo(prev => !prev);
  const toggleResidentsModal = () => setIsResidentsModalOpen(prev => !prev);

  const state: UIState = { showVideo, videoSrc, slides, isLoading, error, isResidentsModalOpen };
  const actions: UIActions = {
    toggleShowVideo,
    setVideoSrc,
    setSlides,
    toggleResidentsModal,
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
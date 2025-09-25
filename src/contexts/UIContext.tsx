import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { HeroSlide } from '../components/HeroSection';

interface UIState {
  showVideo: boolean;
  videoSrc: string;
  slides: HeroSlide[];
  isLoading: boolean;
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

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/settings');
        const data = await response.json();
        setShowVideo(data.showVideo);
        setVideoSrc(data.videoSrc);
        setSlides(data.slides);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const toggleShowVideo = () => setShowVideo(prev => !prev);

  const state: UIState = { showVideo, videoSrc, slides, isLoading };
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
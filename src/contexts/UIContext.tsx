import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HeroSlide } from '../components/HeroSection';

// Initial Data
const initialSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Live Now: Morning Vibes',
    subtitle: 'Fresh beats to start your day right',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758625050/radio%20amble%20immagini/gemini-2.5-flash-image-preview_nano-banana__Uomo_deve_tenere_in_.png',
    type: 'show'
  },
  {
    id: '2',
    title: 'New Podcast Episode',
    subtitle: 'Deep dive into electronic music culture',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758625066/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_38AM.png',
    type: 'news'
  },
  {
    id: '3',
    title: 'Weekend Special',
    subtitle: 'Non-stop mix sessions all weekend',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758625015/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_36AM.png',
    type: 'event'
  }
];

const initialVideoSrc = "https://res.cloudinary.com/thinkdigital/video/upload/v1751534019/videoplayback_rm5v5m.mp4";

// 1. Define the shape of the state and actions
interface UIState {
  showVideo: boolean;
  videoSrc: string;
  slides: HeroSlide[];
}

interface UIActions {
  toggleShowVideo: () => void;
  setVideoSrc: (url: string) => void;
  setSlides: (slides: HeroSlide[]) => void;
}

// 2. Create contexts
const UIStateContext = createContext<UIState | undefined>(undefined);
const UIActionsContext = createContext<UIActions | undefined>(undefined);

// 3. Create the provider component
interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState(initialVideoSrc);
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);

  const toggleShowVideo = () => {
    setShowVideo(prev => !prev);
  };

  const state: UIState = { showVideo, videoSrc, slides };
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
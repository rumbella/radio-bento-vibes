import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define the shape of the state and actions
interface UIState {
  showVideo: boolean;
}

interface UIActions {
  toggleShowVideo: () => void;
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

  const toggleShowVideo = () => {
    setShowVideo(prev => !prev);
  };

  const state: UIState = { showVideo };
  const actions: UIActions = { toggleShowVideo };

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
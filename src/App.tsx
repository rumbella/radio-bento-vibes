import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PreLaunchPage from './pages/PreLaunchPage';
import { UIProvider } from './contexts/UIContext';
import PageTransition from './components/ui/PageTransition';

function App() {
  const location = useLocation();
  return (
    <UIProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/pre-launch"
            element={
              <PageTransition>
                <PreLaunchPage />
              </PageTransition>
            }
          />
          <Route path="*" element={<Navigate to="/pre-launch" />} />
        </Routes>
      </AnimatePresence>
    </UIProvider>
  );
}

export default App;

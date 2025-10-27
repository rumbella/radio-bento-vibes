import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { PlayerProvider } from './contexts/PlayerContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import './index.css';
import './spinner.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);

// PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ PWA attiva'))
      .catch(err => console.error('❌ PWA error:', err));
  });
}

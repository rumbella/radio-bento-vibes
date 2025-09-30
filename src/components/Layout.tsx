import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Music, Mic, Users, Grid3X3, Video } from 'lucide-react';
import { usePlayerState, usePlayerActions } from '../contexts/PlayerContext';
import { mockPrograms } from '@/data/playlists';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  const location = useLocation();
  const { playerMode } = usePlayerState();
  const { playStream } = usePlayerActions();

  useEffect(() => {
    const mainPages = ['/', '/concept', '/video', '/playlists', '/podcasts', '/residents'];
    // If we are on a main page and the player is in playlist mode,
    // switch back to the default live stream.
    if (mainPages.includes(location.pathname) && playerMode === 'playlist') {
      if (mockPrograms.length > 0) {
        playStream(mockPrograms[0]);
      }
    }
  }, [location, playerMode, playStream]);

  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'concept', path: '/concept', label: 'Concept', icon: Music },
    { id: 'video', path: '/video', label: 'Video', icon: Video },
    { id: 'playlists', path: '/playlists', label: 'Playlist', icon: Music },
    { id: 'podcasts', path: '/podcasts', label: 'Podcast', icon: Mic },
    { id: 'residents', path: '/residents', label: 'Residents', icon: Users },
  ];

  const getBackgroundClass = () => {
    if (currentPage === 'playlists' || currentPage === 'podcasts' || currentPage.startsWith('playlist/')) {
      return 'bg-background-dark';
    }
    return 'bg-global-bg';
  };

  return (
    <div className={`min-h-screen flex flex-col ${getBackgroundClass()}`}>
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className=" mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://res.cloudinary.com/thinkdigital/image/upload/e_background_removal/f_png/v1749389697/logo_fenicottero_zohwaw.png" 
                alt="Radio Amblè" 
                className="h-10"
              />
              <div>
                <h1 className="text-xl font-bold text-white">Radio Amblè</h1>
                <p className="text-sm text-white">Fresh Sound and Podcasts</p>
              </div>
            </div>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 relative z-10">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto lg:max-w-4xl px-4">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex flex-col items-center py-2 px-3 transition-all ${
                    isActive 
                      ? 'text-white bg-white/20 rounded-full'
                      : 'text-gray-400 hover:text-white rounded-lg'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Home, Music, Mic, Users, Grid3X3, Video } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'concept', label: 'Concept', icon: Music },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'playlists', label: 'Playlist', icon: Music },
    { id: 'podcasts', label: 'Podcast', icon: Mic },
    { id: 'residents', label: 'Residents', icon: Users },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#000000] ">
      {/* Header */}
      <header className=" backdrop-blur-md sticky top-0 z-50">
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
      <nav className="fixed bottom-0 left-0 right-0  backdrop-blur-md z-50">
        <div className="max-w-md mx-auto lg:max-w-4xl px-4">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                    isActive 
                      ? 'text-white bg-white/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Music, Mic, Users, Grid3X3, Video } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = [
    { id: 'home', path: '/', label: 'Home', icon: Home },
    { id: 'concept', path: '/concept', label: 'Concept', icon: Music },
    { id: 'video', path: '/video', label: 'Video', icon: Video },
    { id: 'playlists', path: '/playlists', label: 'Playlist', icon: Music },
    { id: 'podcasts', path: '/podcasts', label: 'Podcast', icon: Mic },
    { id: 'residents', path: '/residents', label: 'Residents', icon: Users },
  ];

  const getBackgroundClass = () => {
    return 'bg-global-bg';
  };

  return (
    <div className={`h-screen flex flex-col ${getBackgroundClass()} overflow-hidden`}>
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-5 bg-transparent text-white">
        <div className="flex-1 flex justify-start">
          {/* Mobile Header: Logo + Powered by */}
          <div className="flex lg:hidden items-center space-x-2">
            <img
              src="https://res.cloudinary.com/thinkdigital/image/upload/e_background_removal/f_png/v1749389697/logo_fenicottero_zohwaw.png"
              alt="Radio Amblè"
              className="h-8"
            />
            <span className="text-white/90 text-sm font-bold">powered radio amblè</span>
          </div>
          {/* Desktop Header: Logo + Brand Text */}
          <div className="hidden lg:flex items-center space-x-4">
            <img
              src="https://res.cloudinary.com/thinkdigital/image/upload/e_background_removal/f_png/v1749389697/logo_fenicottero_zohwaw.png"
              alt="Radio Amblè"
              className="h-10"
            />
            <div>
              <h1 className="font-bold text-xl">fresh sound</h1>
              <p className="text-white/70 text-sm">and podcasts</p>
            </div>
          </div>
        </div>

        {/* Center (Desktop only) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <span className="text-white/80 text-sm font-bold">powered by radio Amblè</span>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <button onClick={handleLogout} className="text-white hover:bg-white/10 text-sm p-2 rounded-md">Logout</button>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-white/10 text-sm p-2 rounded-md">Login</Link>
                <Link to="/signup" className="text-white bg-blue-500 hover:bg-blue-600 text-sm p-2 rounded-md">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-hidden relative z-10">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="h-[10vh] z-50">
        <div className="h-full max-w-md mx-auto lg:max-w-4xl px-4">
          <div className="h-full flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex flex-col items-center py-1 px-2 transition-all ${
                    isActive 
                      ? 'text-white bg-white/20 rounded-full'
                      : 'text-gray-400 hover:text-white rounded-lg'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[10px] mt-0.5">{item.label}</span>
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

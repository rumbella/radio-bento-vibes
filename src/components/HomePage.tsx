import React from 'react';
import HeroSection from './HeroSection';
import NewRadioPlayer from './NewRadioPlayer';

const HomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 mx-auto px-4 lg:px-8">
      {/* Left Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-[25%]">
        <div className="h-[calc(100vh-12rem)] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-4">Radio Info</h3>
            <div className="space-y-3">
              <div className="text-sm opacity-80">
                <p>Now Playing</p>
                <p className="font-medium">Live Stream</p>
              </div>
              <div className="text-sm opacity-80">
                <p>Next Show</p>
                <p className="font-medium">20:00 - Deep House Mix</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Slideshow Component - Mobile: full height, Desktop: 45% width */}
      <div className="w-full h-full lg:w-[45%]">
        <div className="h-full lg:h-[calc(100vh-12rem)]">
          <HeroSection />
        </div>
      </div>
      
      {/* Radio Player - Mobile: fixed bottom with 90px from navigation, Desktop: right side */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[160px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)] z-10">
        <NewRadioPlayer />
      </div>
    </div>
  );
};

export default HomePage;

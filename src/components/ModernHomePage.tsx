import React from 'react';
import HeroSection from './HeroSection';
import ModernPlayer from './music/ModernPlayer';

const ModernHomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 mx-auto px-4 lg:px-8">
      {/* Hero Section - Slideshow Component - Mobile: full height, Desktop: 70% width */}
      <div className="w-full h-full lg:w-[70%] lg:h-full">
        <HeroSection />
      </div>
      
        {/* Modern Player - Mobile: fixed bottom with 90px from navigation, Desktop: right side matching homepage */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[160px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)] lg:ml-auto z-10 flex items-center justify-center">
        <ModernPlayer />
      </div>
    </div>
  );
};

export default ModernHomePage;
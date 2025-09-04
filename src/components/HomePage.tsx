import React from 'react';
import HeroSection from './HeroSection';
import RadioPlayer from './RadioPlayer';

const HomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 mx-auto px-4 lg:px-8">
      {/* Hero Section - Slideshow Component - Mobile: full height, Desktop: 70% width */}
      <div className="w-full h-full lg:w-[70%] lg:h-full">
        <HeroSection />
      </div>
      
      {/* Radio Player - Stream Component - Hidden on mobile, Desktop: 30% width */}
      <div className="hidden lg:block lg:w-[30%] lg:h-full">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default HomePage;

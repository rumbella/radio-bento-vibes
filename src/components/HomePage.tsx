import React from 'react';
import HeroSection from './HeroSection';
import RadioPlayer from './RadioPlayer';

const HomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 mx-auto px-4 lg:px-8">
      {/* Hero Section - Slideshow Component - Mobile: 60% height, Desktop: 65% width */}
      <div className="w-full h-[37.5%] lg:w-[70%] lg:h-full">
        <HeroSection />
      </div>
      
      {/* Radio Player - Stream Component - Mobile: 30% height, Desktop: 30% width */}
      <div className="w-full h-[52.5%] lg:w-[30%] lg:h-full">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default HomePage;

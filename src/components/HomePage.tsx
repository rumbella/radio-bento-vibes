import React, { useState } from 'react';
import HeroSection, { HeroSlide } from './HeroSection';
import NewRadioPlayer from './NewRadioPlayer';
import DynamicTicker from './DynamicTicker';

const slides: HeroSlide[] = [
  {
    id: '1',
    title: 'Live Now: Morning Vibes',
    subtitle: 'Fresh beats to start your day right',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    type: 'show'
  },
  {
    id: '2',
    title: 'New Podcast Episode',
    subtitle: 'Deep dive into electronic music culture',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1753024181/dj-8049453_640_svyxm9.jpg',
    type: 'news'
  },
  {
    id: '3',
    title: 'Weekend Special',
    subtitle: 'Non-stop mix sessions all weekend',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1753024181/concert-3084876_640_cr5n4b.jpg',
    type: 'event'
  }
];

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<HeroSlide | null>(null);

  const handleSlideChange = (slide: HeroSlide) => {
    setCurrentSlide(slide);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-full">
        <div className="w-full flex-grow">
          <HeroSection slides={slides} onSlideChange={handleSlideChange} />
        </div>
        <DynamicTicker slide={currentSlide} />
        <div className="p-4">
          <NewRadioPlayer />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid h-screen grid-cols-2 grid-rows-[35%_auto] gap-4 px-4 mx-auto lg:flex lg:flex-row lg:h-[calc(100vh-8rem)] lg:px-8">
          {/* Left Sidebar - Top-left on mobile, visible on all screens */}
          <div className="col-start-1 row-start-1 p-4 lg:w-[25%]">
            <div className="h-full p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl lg:h-[calc(100vh-12rem)]">
              <div className="text-white">
                <h3 className="mb-4 text-lg font-semibold">Radio Info</h3>
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

          {/* Hero Section - Slideshow Component - Top-right on mobile */}
          <div className="col-start-2 row-start-1 p-4 lg:w-[45%]">
            <div className="h-full lg:h-[calc(100vh-12rem)]">
              <HeroSection slides={slides} onSlideChange={handleSlideChange} />
            </div>
          </div>

          {/* Radio Player - Bottom on mobile, right side on desktop */}
          <div className="col-span-2 row-start-2 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)]">
            <NewRadioPlayer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React, { useState } from 'react';
import HeroSection, { HeroSlide } from './HeroSection';
import NewRadioPlayer from './NewRadioPlayer';
import DynamicTicker from './DynamicTicker';

const slides: HeroSlide[] = [
  {
    id: '1',
    title: 'Live Now: Morning Vibes',
    subtitle: 'Fresh beats to start your day right',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758625050/radio%20amble%20immagini/gemini-2.5-flash-image-preview_nano-banana__Uomo_deve_tenere_in_.png',
    type: 'show'
  },
  {
    id: '2',
    title: 'New Podcast Episode',
    subtitle: 'Deep dive into electronic music culture',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758625066/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_38AM.png',
    type: 'news'
  },
  {
    id: '3',
    title: 'Weekend Special',
    subtitle: 'Non-stop mix sessions all weekend',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758625015/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_36AM.png',
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
      <div className="lg:hidden flex flex-col h-[calc(100vh-12rem)] p-4 gap-4 bg-[#151419]">
        <div className="w-full h-[50%] rounded-lg overflow-hidden rounded-3xl rounded-3xl shadow-2xl rounded bg-[#151419]">
          <HeroSection slides={slides} onSlideChange={handleSlideChange} />
        </div>
        <DynamicTicker slide={currentSlide} />
        <div className="flex-grow">
          <NewRadioPlayer />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid h-screen grid-cols-2 grid-rows-[35%_auto] gap-4 px-4 mx-auto lg:flex lg:flex-row lg:h-[calc(100vh-8rem)] lg:px-8 bg-[#151419]">
          {/* Left Sidebar - Top-left on mobile, visible on all screens */}
          <div className="col-start-1 row-start-1 p-4 lg:w-[25%]">
            <div className="h-full p-6 bg-[#1b1b1e] rounded-3xl shadow-2xl lg:h-[calc(100vh-12rem)]">
              <div className="text-white">
                <h3 className="mb-4 text-4xl font-semibold">Radio Info</h3>
                <div className="space-y-3">
                  <div className="text-3xl opacity-80">
                    <p>Now Playing</p>
                    <p className="font-medium">Live Stream</p>
                  </div>
                  <div className="text-3xl opacity-80">
                    <p>Next Show</p>
                    <p className="font-medium">20:00 - Deep House Mix</p>
                  </div>
                    <div className="text-3xl opacity-80">
                      <h3 className="mb-4 text-4xl font-semibold">Radio Info</h3>
                    <p>Next Show</p>
                       
                    <p className="font-medium">20:00 - Deep House Mix</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section - Slideshow Component - Top-right on mobile */}
          <div className="col-start-2 row-start-1 p-4 lg:w-[45%] rounded-3xl shadow-2xl rounded-lg">
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

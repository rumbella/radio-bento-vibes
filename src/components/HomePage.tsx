import React, { useState } from 'react';
import HeroSection, { HeroSlide } from './HeroSection';
import NewRadioPlayer from './NewRadioPlayer';
import DynamicTicker from './DynamicTicker';
import VideoBackground from './VideoBackground';

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
  const [showVideo, setShowVideo] = useState(false);

  const handleSlideChange = (slide: HeroSlide) => {
    setCurrentSlide(slide);
  };

  const videoSrc = "https://res.cloudinary.com/thinkdigital/video/upload/v1751534019/videoplayback_rm5v5m.mp4";

  return (
    <>
      {/* Toggle Button */}
      <div className="absolute top-20 right-4 z-20">
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          {showVideo ? 'Show Slideshow' : 'Show Video'}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-12rem)] p-4 gap-4 bg-[#151419] relative">
        <div className="w-full h-[50%] rounded-lg overflow-hidden rounded-3xl shadow-2xl bg-[#151419]">
          {showVideo ? (
            <VideoBackground videoSrc={videoSrc} />
          ) : (
            <HeroSection slides={slides} onSlideChange={handleSlideChange} />
          )}
        </div>
        <DynamicTicker slide={currentSlide} />
        <div className="flex-grow">
          <NewRadioPlayer />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative">
        <div className="grid h-screen grid-cols-2 grid-rows-[35%_auto] gap-4 px-4 mx-auto lg:flex lg:flex-row lg:h-[calc(100vh-8rem)] lg:px-8 bg-[#151419]">
          {/* Left Sidebar */}
          <div className="col-start-1 row-start-1 p-4 lg:w-[25%]">
            <div className="h-full p-6 bg-[#1b1b1e] rounded-3xl shadow-2xl lg:h-[calc(100vh-12rem)]">
              <div className="text-white">
                <h3 className="mb-4 text-3xl font-semibold">Radio Info</h3>
                <div className="space-y-3">
                  <div className="text-1xl opacity-80">
                    <p>Now Playing</p>
                    <p className="font-medium">Live Stream</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section or Video Background */}
          <div className="col-start-2 row-start-1 p-4 lg:w-[45%] rounded-3xl shadow-2xl rounded-lg">
            <div className="h-full lg:h-[calc(100vh-12rem)]">
              {showVideo ? (
                <VideoBackground videoSrc={videoSrc} />
              ) : (
                <HeroSection slides={slides} onSlideChange={handleSlideChange} />
              )}
            </div>
          </div>

          {/* Radio Player */}
          <div className="col-span-2 row-start-2 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)]">
            <NewRadioPlayer />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React from 'react';
import HeroSection from './HeroSection';
import NewRadioPlayer from './NewRadioPlayer';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-12rem)] p-4 gap-4">
        {/* Top section */}
        <div className="flex h-[55%] w-full gap-4">
          <div className="w-1/2">
            <div className="h-full p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
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
          <div className="w-1/2">
            <div className="h-full">
              <HeroSection />
            </div>
          </div>
        </div>
        {/* Player Section */}
        <div className="flex-grow">
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
              <HeroSection />
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

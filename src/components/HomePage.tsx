import React, { useState } from 'react';
import HeroSection, { HeroSlide } from './HeroSection';
import NewRadioPlayer from './NewRadioPlayer';
import DynamicTicker from './DynamicTicker';
import VideoBackground from './VideoBackground';
import { useUIState } from '../contexts/UIContext';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<HeroSlide | null>(null);
  const { showVideo, videoSrc, slides, isLoading, error } = useUIState();

  const handleSlideChange = (slide: HeroSlide) => {
    setCurrentSlide(slide);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="content-container"><div className="spinner"></div></div>;
    }
    if (error) {
      return <div className="content-container text-center p-4"><p>{error}</p></div>;
    }
    if (showVideo) {
      return <VideoBackground videoSrc={videoSrc} />;
    }
    return <HeroSection slides={slides} onSlideChange={handleSlideChange} />;
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-12rem)] p-4 gap-4 bg-[#151419] relative">
        <div className="w-full h-[50%] rounded-lg overflow-hidden rounded-3xl shadow-2xl bg-[#151419]">
          {renderContent()}
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
               
                <div className="space-y-3">
                  <div className="text-1xl opacity-80 text-xl font-bold text-white">
                    <p className="text-xl font-bold text-white mt-4 pt-4">
                    "Uno dei motivi più forti che conducono gli uomini all'arte e alla scienza è 
                      la fuga dalla vita quotidiana 
                      con la sua dolorosa crudezza e 
                      la tetra mancanza di speranza".
                      - Albert Einstein -
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Section or Video Background */}
          <div className="col-start-2 row-start-1 p-4 lg:w-[45%] rounded-3xl shadow-2xl rounded-lg">
            <div className="h-full lg:h-[calc(100vh-12rem)]">
              {renderContent()}
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

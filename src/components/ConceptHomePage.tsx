import React from 'react';
import RadioPlayer from './RadioPlayer';

const ConceptHomePage: React.FC = () => {
  return (
    <div className="h-full flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Full Background Image */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/concept-bg.jpg')`
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Radio Player - Mobile: bottom, Desktop: right side (1/3 width) */}
      <div className="w-full h-[52.5%] lg:w-[30%] lg:h-full lg:ml-auto relative z-10">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default ConceptHomePage;
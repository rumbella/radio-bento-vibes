import React from 'react';
import { Users, Radio } from 'lucide-react';
import RadioPlayer from './RadioPlayer';

const ConceptHomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Full Background Image */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/thinkdigital/image/upload/v1756910411/500501bc6a3eaca283c3c4951e15cc01_esu1fv.jpg')`
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Radio Player - Mobile: fixed bottom with 90px from navigation, Desktop: right side matching homepage */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[180px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-full lg:ml-auto z-10">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default ConceptHomePage;

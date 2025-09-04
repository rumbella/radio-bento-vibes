import React from 'react';
import { Users, Radio } from 'lucide-react';
import RadioPlayer from './RadioPlayer';

const ConceptHomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Full Background Image */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/thinkdigital/image/upload/v1756910411/500501bc6a3eaca283c3c4951e15cc01_esu1fv.jpg')`
        }}
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Info Header above player - Mobile only */}
      <div className="fixed bottom-[240px] left-4 right-4 lg:hidden z-10">
        <div className="flex items-center justify-between mb-4 bg-gluon-grey/80 backdrop-blur-md rounded-lg p-3">
          {/* Live + Listeners (sinistra) */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-liquid-lava rounded-full animate-pulse"></div>
              <span className="text-liquid-lava font-semibold text-sm uppercase tracking-wide">
                Live
              </span>
            </div>
            <div className="flex items-center space-x-1 text-dusty-grey">
              <Users size={14} />
              <span className="text-xs">1247</span>
            </div>
          </div>
          
          {/* Genre (destra) */}
          <div className="flex items-center space-x-2 text-dusty-grey">
            <Radio size={16} />
            <span className="text-sm">Deep House</span>
          </div>
        </div>
      </div>

      {/* Radio Player - Mobile: fixed bottom with 90px from navigation, Desktop: right side matching homepage */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[120px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-full lg:ml-auto z-10">
        <div className="bg-gluon-grey/80 backdrop-blur-md rounded-2xl p-4 lg:p-6 h-full flex flex-col lg:border lg:border-slate-grey/50">
          <RadioPlayer />
        </div>
      </div>
    </div>
  );
};

export default ConceptHomePage;

import React from 'react';
import RadioPlayer from './RadioPlayer';

// Sub-component for the text content to avoid duplication
const Content = () => (
  <div className="text-white">
    <h3 className="text-lg font-semibold mb-4">Radio Fenicottero</h3>
    <div className="space-y-3">
      <div className="text-sm opacity-80">
        <p>Benvenuti su Radio Fenicottero</p>
        <p className="font-medium">La vostra radio preferita</p>
      </div>
      <div className="text-sm opacity-80">
        <p>In onda ora</p>
        <p className="font-medium">Musica Live 24/7</p>
      </div>
    </div>
  </div>
);

// Sub-component for the blurred panel to avoid duplicating styles
const BlurPanel: React.FC<{className?: string, children: React.ReactNode}> = ({ className, children }) => (
    <div className={`bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 ${className}`}>
        {children}
    </div>
);


const ConceptHomePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-12rem)] relative mx-auto px-4 lg:px-8">
      {/* Full Background Image - Stays in the background for both layouts */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/thinkdigital/image/upload/v1756910411/500501bc6a3eaca283c3c4951e15cc01_esu1fv.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* --- Main Content Area --- */}
      {/* We use a relative z-10 container to ensure content stays above the background */}
      <div className="relative z-10 h-full">

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-row h-full justify-between">
          <div className="w-[65%] h-full">
            <BlurPanel className="h-full">
                <Content />
            </BlurPanel>
          </div>
          <div className="w-[30%] h-full">
            <RadioPlayer />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col h-full">
          {/* Content Panel fills the remaining space */}
          <div className="flex-grow py-4">
              <BlurPanel className="h-full">
                  <Content />
              </BlurPanel>
          </div>
          {/* Player has a fixed height at the bottom */}
          <div className="h-[160px] pb-4">
            <RadioPlayer />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConceptHomePage;

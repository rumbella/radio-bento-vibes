import React from 'react';
import RadioPlayer from './RadioPlayer';
import MobileTicker from './mobile/MobileTicker';

const desktopContent = {
  title: 'Radio Fenicottero',
  welcome: 'Benvenuti su Radio Amble',
  welcomeSubtitle: 'Fresh Sound and Podcasts',
  nowPlaying: 'In onda ora',
  nowPlayingSubtitle: 'Musica Live 24/7'
};

const mobileContent = {
  title: 'Benvenuti su Radio Amble',
  subtitle: 'Fresh Sound and Podcasts',
  show: 'In onda ora',
  showSubtitle: 'Musica Live 24/7'
};

const Videobg: React.FC = () => {
  return (
   
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Full Background Video */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="https://res.cloudinary.com/thinkdigital/video/upload/v1751534019/videoplayback_rm5v5m.mp4" type="video/mp4" />
      </video>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0"></div>
      {/* Content Section - DESKTOP */}
      <div className="hidden lg:block lg:w-[65%] p-4">
        <div className="h-[calc(100vh-12rem)]  p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">{desktopContent.title}</h3>
          <div className="space-y-3">
            <div className="text-2xl lg:text-4xl opacity-80">
              <p>{desktopContent.welcome}</p>
              <p className="text-xl lg:text-2xl">{desktopContent.welcomeSubtitle}</p>
            </div>
            <div className="text-2xl lg:text-4xl opacity-80">
              <p>{desktopContent.nowPlaying}</p>
              <p className="text-xl lg:text-2xl">{desktopContent.nowPlayingSubtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - MOBILE */}
      <div className="lg:hidden absolute top-4 left-4 right-4 bottom-[220px] p-2">
        <div className="h-full">
          {/* Ticker has been moved to be above the player */}
        </div>
      </div>

      {/* Mobile Ticker */}
      <div className="lg:hidden fixed bottom-[275px] left-0 right-0 z-10 px-4">
        <MobileTicker content={mobileContent} />
      </div>

      {/* Radio Player - Mobile: fixed bottom with margin, Desktop: right side matching homepage */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[160px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)] lg:ml-auto z-10">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default Videobg;

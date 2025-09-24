import React from 'react';
import { Users, Radio } from 'lucide-react';
import RadioPlayer from './RadioPlayer';

const Content = () => (
  <div className="text-white">
    <h3 className="text-lg font-semibold mb-4">Radio Fenicottero</h3>
    <div className="space-y-3">
      <div className="text-4xl opacity-80">
        <p>Benvenuti su Radio Fenicottero</p>
        <p className="text-2xl">La vostra radio preferita</p>
      </div>
      <div className="text-4xl opacity-80">
        <p>In onda ora</p>
        <p className="text-2xl">Musica Live 24/7</p>
      </div>
    </div>
  </div>
);


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
        <div className="h-[calc(100vh-12rem)]  p-6">
          <Content />
        </div>
      </div>

      {/* Content Section - MOBILE */}
      <div className="lg:hidden absolute top-4 left-4 right-4 bottom-[220px] p-2">
        <div className="h-full">
          <Content />
        </div>
      </div>

      {/* Radio Player - Mobile: fixed bottom with margin, Desktop: right side matching homepage */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[160px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)] lg:ml-auto z-10">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default Videobg;

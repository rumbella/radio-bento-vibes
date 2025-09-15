import React from 'react';
import ModernPlayer from './music/ModernPlayer';

const GridLayoutPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] mx-auto px-4 lg:px-8">
      {/* Desktop: CSS Grid Layout, Mobile: Vertical Stack */}
      <div className="flex flex-col gap-4 lg:h-full lg:grid lg:grid-cols-2 lg:grid-rows-2">
        
        {/* Dark Gray Div - Full Background Image */}
        <div 
          className="h-64 lg:row-span-2 col-span-1 rounded-2xl overflow-hidden relative bg-gray-800"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Light Gray Div - Weather/Info Widget */}
        <div className="col-span-1 bg-gray-300 rounded-2xl p-6 flex flex-col justify-center text-gray-800">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Milano, IT</h3>
              <span className="text-2xl">☀️</span>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">23°C</p>
              <p className="text-sm text-gray-600">Soleggiato</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>H: 26°</span>
              <span>L: 18°</span>
            </div>
            <div className="pt-2 border-t border-gray-400">
              <p className="text-xs text-gray-500">Radio Amblè Live</p>
              <p className="text-sm font-medium">On Air Now</p>
            </div>
          </div>
        </div>

        {/* Acid Green Div - Modern Player */}
        <div className="col-span-1 bg-lime-400 rounded-2xl p-4 flex items-center justify-center">
          <div className="w-full max-w-xs sm:max-w-sm mx-auto">
            <ModernPlayer />
          </div>
        </div>

      </div>
    </div>
  );
};

export default GridLayoutPage;
import React from 'react';
import { HeroSlide } from './HeroSection';

interface DynamicTickerProps {
  slide: HeroSlide | null;
}

const DynamicTicker: React.FC<DynamicTickerProps> = ({ slide }) => {
  if (!slide) {
    return null;
  }

  const typeText = slide.type === 'show' ? 'Live Show' :
                   slide.type === 'news' ? 'News' : 'Event';

  return (
    <div className="text-white overflow-hidden w-full">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 font-bold">{slide.title}</span>
        <span className="mx-4">{slide.subtitle}</span>
        <span className="mx-4 text-liquid-lava font-medium">{typeText}</span>
      </div>
    </div>
  );
};

export default DynamicTicker;

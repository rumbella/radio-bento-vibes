import React from 'react';
import { HeroSlide } from './HeroSection';

interface DynamicTickerProps {
  slide: HeroSlide | null;
  mainText: string;
}

const DynamicTicker: React.FC<DynamicTickerProps> = ({ slide, mainText }) => {
  const typeText = slide
    ? slide.type === 'show'
      ? 'Live Show'
      : slide.type === 'news'
      ? 'News'
      : 'Event'
    : '';

  return (
    <div className="text-white overflow-hidden w-full">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4">{mainText}</span>
        {slide && (
          <>
            <span className="mx-4 font-bold">{slide.title}</span>
            <span className="mx-4">{slide.subtitle}</span>
            <span className="mx-4 text-liquid-lava font-medium">{typeText}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicTicker;

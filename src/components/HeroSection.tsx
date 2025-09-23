import React, { useState, useEffect } from 'react';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type: 'show' | 'news' | 'event';
}

interface HeroSectionProps {
  onSlideChange: (slide: HeroSlide) => void;
  slides: HeroSlide[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSlideChange, slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 0) {
      onSlideChange(slides[currentSlide]);
    }
  }, [currentSlide, onSlideChange, slides]);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (slides.length === 0) {
    return <div className="relative h-full overflow-hidden bg-gray-900"></div>;
  }

  return (
    <div className="relative h-full overflow-hidden rounded-3xl">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-liquid-lava' : 'bg-dusty-grey'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

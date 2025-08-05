import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type: 'show' | 'news' | 'event';
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides: HeroSlide[] = [
    {
      id: '1',
      title: 'Live Now: Morning Vibes',
      subtitle: 'Fresh beats to start your day right',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      type: 'show'
    },
    {
      id: '2',
      title: 'New Podcast Episode',
      subtitle: 'Deep dive into electronic music culture',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1753024181/dj-8049453_640_svyxm9.jpg',
      type: 'news'
    },
    {
      id: '3',
      title: 'Weekend Special',
      subtitle: 'Non-stop mix sessions all weekend',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1753024181/concert-3084876_640_cr5n4b.jpg',
      type: 'event'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-full overflow-hidden rounded-2xl">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <div className="mb-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-snow mb-2">
            {slides[currentSlide].title}
          </h2>
          <p className="text-dusty-grey text-sm lg:text-base">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Type indicator */}
        <div className="inline-block  text-liquid-lava px-3 py-1 rounded-full text-sm font-medium ">
          {slides[currentSlide].type === 'show' ? 'Live Show' : 
           slides[currentSlide].type === 'news' ? 'News' : 'Event'}
        </div>
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

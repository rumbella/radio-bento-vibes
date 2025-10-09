import React, { useState, useEffect } from 'react';
import RadioPlayer from './RadioPlayer';
import MobileTicker from './mobile/MobileTicker';

const images = [
  'https://res.cloudinary.com/thinkdigital/image/upload/c_pad,b_gen_fill,ar_16:9/v1758625184/radio%20amble%20immagini/gemini-2.5-flash-image-preview_nano-banana__Steeve_Macqueen_che_.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758714158/1758714007182-679c260b-9ed1-4078-8502-2176ff6bfa41_ihqh3f.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758714241/1758714137173-ac8f5ced-b1f9-48e1-9d1e-e8550fff56ca_chjfs9.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/c_pad,b_gen_fill,ar_16:9/v1758625066/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_38AM.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758716754/1758715806855-177b2083-d42a-4ea7-951c-bfcdc1838437_ejvwya.png'
];

const desktopContent = {
  title: 'Radio Fenicottero',
  welcome: 'Benvenuti su Radio Amblè',
  welcomeSubtitle: 'Fresh Sound and Podcasts',
  nowPlaying: 'In onda ora',
  nowPlayingSubtitle: 'Musica Live 24/7'
};

const mobileContent = {
  title: 'Benvenuti su Radio Amblè',
  subtitle: 'Fresh Sound and Podcasts',
  show: 'In onda ora',
  showSubtitle: 'Musica Live 24/7'
};

const ConceptHomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // The user requested a transition similar to SinglePlaylistPage,
  // but no slideshow exists there. The existing fade transition is kept.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * images.length);
        } while (newIndex === prevIndex);
        return newIndex;
      });
    }, 180000); // 3 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Full Background Slideshow */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`
            }}
          />
        ))}
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Section - DESKTOP */}
      <div className="hidden lg:block lg:w-[65%] p-4">
        <div className="h-[calc(100vh-12rem)] text-white">
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
      <div className="lg:hidden absolute top-4 left-4 right-4 bottom-[20px] p-2">
        <div className="h-full p-6">
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

export default ConceptHomePage;

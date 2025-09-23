import React, { useState, useEffect } from 'react';
import { Users, Radio } from 'lucide-react';
import RadioPlayer from './RadioPlayer';

const images = [
  'https://res.cloudinary.com/thinkdigital/image/upload/c_pad,b_gen_fill,ar_16:9/v1758625184/radio%20amble%20immagini/gemini-2.5-flash-image-preview_nano-banana__Steeve_Macqueen_che_.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/c_pad,b_gen_fill,ar_16:9/v1757056076/gemini-2.5-flash-image-preview_nano-banana__cambia_contesto_e_i_rvyutz.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1757056075/1756376933817_uin09f_tlothe.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758625122/radio%20amble%20immagini/gemini-2.5-flash-image-preview_nano-banana__Sostituzione_con_Yod.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758625066/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_38AM.png',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1758625015/radio%20amble%20immagini/Generated_Image_September_23_2025_-_11_36AM.png'
];

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


const ConceptHomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

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
        <div className="h-[calc(100vh-12rem)] p-6">
          <Content />
        </div>
      </div>

      {/* Content Section - MOBILE */}
      <div className="lg:hidden absolute top-4 left-4 right-4 bottom-[220px] p-2">
        <div className="h-full p-6">
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

export default ConceptHomePage;

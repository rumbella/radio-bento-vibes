import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Resident } from '../types';
import ResidentPlayer from '../components/music/ResidentPlayer';
import DetailNav from '../components/ui/DetailNav';
import ShareBar from '../components/ui/ShareBar';

// Mock data - in a real app, this would come from a context or API call
const residents: Resident[] = [
  {
    id: '1',
    name: 'Rufus City sound pr. 4 sett 25 (1)',
    bio: 'Rufus City sound',
    image: 'https://placehold.co/1200x1200',
    shows: ['Friday Night Mix', 'Deep Dive Sessions'],
    socialLinks: {
      instagram: 'https://instagram.com/djphoenix',
      soundcloud: 'https://soundcloud.com/djphoenix'
    },
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1760218017/rufus-city-sound-pr-4-sett-25_8navGs9q_grheai.mp3',
    backgroundImageUrls: [
      'https://placehold.co/1200x1200',
      'https://placehold.co/1200x1201',
      'https://placehold.co/1200x1202'
    ],
    djImageUrl: 'https://placehold.co/200x200'
  },
  {
    id: '2',
    name: 'A. Anedda Disco Spektrum',
    bio: 'A. Anedda Disco Spektrum',
    image: 'https://placehold.co/1200x1200',
    shows: ['Midnight Chill', 'Sunday Sunrise'],
    socialLinks: {
      instagram: 'https://instagram.com/lunabeats',
      mixcloud: 'https://mixcloud.com/lunabeats'
    },
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1760223035/a-anedda-disco-spektrum-22-agosto-25-1-i03iaiuv_OvJciUM8_mmtavk.mp3',
    backgroundImageUrls: [
      'https://placehold.co/1200x1200',
      'https://placehold.co/1200x1201',
      'https://placehold.co/1200x1202'
    ],
    djImageUrl: 'https://placehold.co/200x200'
  }
];

const SingleResidentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resident = residents.find(r => r.id === id);
  const title = "ascolta i nostri djset";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const images = resident?.backgroundImageUrls;
    if (images && images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [resident]);

  if (!resident) {
    return <div className="text-white text-center p-8">Resident not found</div>;
  }

  const images = resident.backgroundImageUrls || [];

  return (
    <div className="h-full w-full flex flex-col relative">
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

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 lg:p-8">
        <DetailNav title={title} />
      </div>

      {/* Main Content Flex Container */}
      <div className="flex-grow flex flex-col lg:flex-row items-end lg:items-center relative z-10 p-4 lg:p-8 mt-[60px] lg:mt-0">

        {/* Left Content Area (Desktop) / Hidden on Mobile */}
        <div className="hidden lg:flex lg:flex-col lg:w-[65%] lg:h-full lg:justify-center text-white">
          <h2 className="text-4xl font-bold mb-2">{resident.name}</h2>
          <p className="text-lg opacity-80">{resident.bio}</p>
          <div className="mt-8 w-full max-w-md">
            <ShareBar />
          </div>
        </div>

        {/* Player Container */}
        <div className="fixed bottom-[30px] left-4 right-4 z-20 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-full flex lg:items-center">
          <div className="w-full flex flex-col gap-2">
            {/* Share Bar for Mobile - positioned above the player */}
            <div className="lg:hidden mb-1.5">
              <ShareBar />
            </div>

            {/* Player */}
            <ResidentPlayer resident={resident} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResidentPage;

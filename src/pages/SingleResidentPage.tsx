import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Resident } from '../types';
import ResidentPlayer from '../components/music/ResidentPlayer';
import DetailNav from '../components/ui/DetailNav';
import ShareBar from '../components/ui/ShareBar';

const BACKGROUND_IMAGES = [
  'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
  'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg'
];

// Mock data - in a real app, this would come from a context or API call
const residents: Resident[] = [
  {
    id: '1',
    name: 'DJ Phoenix',
    bio: 'Electronic music pioneer with 10 years of experience',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    shows: ['Friday Night Mix', 'Deep Dive Sessions'],
    socialLinks: {
      instagram: 'https://instagram.com/djphoenix',
      soundcloud: 'https://soundcloud.com/djphoenix'
    }
  },
  {
    id: '2',
    name: 'Luna Beats',
    bio: 'Specializing in ambient and downtempo',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    shows: ['Midnight Chill', 'Sunday Sunrise'],
    socialLinks: {
      instagram: 'https://instagram.com/lunabeats',
      mixcloud: 'https://mixcloud.com/lunabeats'
    }
  }
];

const SingleResidentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resident = residents.find(r => r.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sponsorName = "Radio Amblé";

  // Slideshow effect - changes every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!resident) {
    return <div className="text-white text-center p-8">Resident not found</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col relative bg-transparent">
      {/* Dynamic Background Image */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${BACKGROUND_IMAGES[currentImageIndex]}')` }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 lg:p-8">
        <DetailNav sponsorName={sponsorName} />
      </div>

      {/* Main Content Flex Container */}
      <div className="flex-grow flex flex-col lg:flex-row items-end lg:items-center relative z-10 p-4 lg:p-8 mt-[60px] lg:mt-0">

        {/* Left Content Area (Desktop) / Hidden on Mobile */}
        <div className="hidden lg:flex lg:flex-col lg:w-[65%] lg:h-full lg:justify-center text-white">
          <h2 className="text-4xl font-bold mb-2">{resident.name}</h2>
          <p className="text-lg opacity-80">{resident.bio}</p>
          <div className="mt-8 w-full max-w-md">
            <ShareBar sponsorName={sponsorName} />
          </div>
        </div>

        {/* Player Container */}
        <div className="w-full lg:w-[30%] lg:h-full flex items-end lg:items-center">
          <div className="w-full flex flex-col gap-2">
            {/* Share Bar for Mobile - positioned above the player */}
            <div className="lg:hidden mb-1.5">
              <ShareBar sponsorName={sponsorName} />
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

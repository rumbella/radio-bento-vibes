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
    name: 'DJ Phoenix',
    bio: 'Electronic music pioneer with 10 years of experience',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    shows: ['Friday Night Mix', 'Deep Dive Sessions'],
    socialLinks: {
      instagram: 'https://instagram.com/djphoenix',
      soundcloud: 'https://soundcloud.com/djphoenix'
    },
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3',
    backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    djImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg'
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
    },
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3',
    backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    djImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg'
  }
];

const SingleResidentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resident = residents.find(r => r.id === id);
  const title = "ascolta i nostri djset";

  useEffect(() => {
    if (resident?.backgroundImageUrl) {
      document.body.style.backgroundImage = `url(${resident.backgroundImageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    }

    // Cleanup function to remove the background style when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
    };
  }, [resident]);

  if (!resident) {
    return <div className="text-white text-center p-8">Resident not found</div>;
  }

  return (
    <div className="h-full w-full flex flex-col relative">
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

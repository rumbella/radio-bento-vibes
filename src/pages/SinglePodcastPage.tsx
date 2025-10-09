import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Podcast } from '../types';
import PodcastPlayer from '../components/music/PodcastPlayer';
import DetailNav from '../components/ui/DetailNav';
import ShareBar from '../components/ui/ShareBar';

// Mock data - in a real app, this would come from a context or API call
const podcasts: Podcast[] = [
  {
    id: '1',
    title: 'Tech Talks',
    description: 'Exploring the latest in technology',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    duration: '45:32',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Music Matters',
    description: 'Deep dive into music culture',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    duration: '38:20',
    date: '2024-01-10'
  }
];

const SinglePodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = podcasts.find(p => p.id === id);
  const title = "tutti i podcst di Radio Amblè";

  if (!podcast) {
    return <div className="text-white text-center p-8">Podcast not found</div>;
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
          <h2 className="text-4xl font-bold mb-2">{podcast.title}</h2>
          <p className="text-lg opacity-80">{podcast.description}</p>
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
            <PodcastPlayer podcast={podcast} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePodcastPage;

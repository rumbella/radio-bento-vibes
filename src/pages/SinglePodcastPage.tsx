import React from 'react';
import { useParams } from 'react-router-dom';
import type { Podcast } from '../types';
import PodcastPlayer from '../components/music/PodcastPlayer';
import DetailNav from '../components/ui/DetailNav';
import ShareBar from '../components/ui/ShareBar';

// Mock data - in a real app, this would come from a context or API call
const podcasts: Podcast[] = [
  {
    id: '1',
    title: 'Modern House Essentials',
    description: 'Exploring the latest trends in house music.',
    djName: 'DJ Minx',
    coverImage: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3',
    backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1759787126/deadmau5-press-photo-2016-billboard-1548_ygsmbm.webp'
  },
  {
    id: '2',
    title: 'Ambient Mornings',
    description: 'A curated selection of chillwave and ambient tracks.',
    djName: 'DJ Flow',
    coverImage: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3',
    backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1759787379/maxresdefault_pmyuzy.jpg'
  },
];

const SinglePodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = podcasts.find(p => p.id === id) || podcasts[0];
  const title = "i podcast di Radio Amblè";

  if (!podcast) {
    return <div className="text-white">Podcast not found</div>;
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${podcast.backgroundImageUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Navigation */}
        <div className="p-4 lg:p-8">
          <DetailNav title={title} />
        </div>

        {/* Main Content Flex Container */}
        <div className="flex-grow flex flex-col lg:flex-row items-end lg:items-center p-4 lg:p-8 pt-0">

          {/* Left Content Area (Desktop) */}
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
              <div className="lg:hidden mb-1.5">
                <ShareBar />
              </div>
              <PodcastPlayer
                title={podcast.title}
                djName={podcast.djName}
                coverImage={podcast.coverImage}
                audioUrl={podcast.audioUrl}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SinglePodcastPage;

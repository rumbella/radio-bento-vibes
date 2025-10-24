import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Resident } from '../types';
import ResidentPlayer from '../components/music/ResidentPlayer';
import DetailNav from '../components/ui/DetailNav';
import ShareBar from '../components/ui/ShareBar';

// Mock data
const residents: Resident[] = [
  {
    id: '1',
    name: 'DJ Minx',
    bio: 'A prominent figure in the Detroit house music scene.',
    djImageUrl: 'https://i1.sndcdn.com/avatars-000192322329-8a16sn-t500x500.jpg',
    audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3',
    backgroundImageUrls: [
        'https://res.cloudinary.com/thinkdigital/image/upload/v1759787126/deadmau5-press-photo-2016-billboard-1548_ygsmbm.webp',
        'https://res.cloudinary.com/thinkdigital/image/upload/v1759787379/maxresdefault_pmyuzy.jpg',
        'https://res.cloudinary.com/thinkdigital/image/upload/v1760087524/artworks-000012560643-t526va-t1080x1080_jxlikn.jpg'
    ]
  },
  // ... other residents
];

const SingleResidentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resident = residents.find(r => r.id === id) || residents[0];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const title = "i resident di Radio Amblè";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % resident.backgroundImageUrls.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [resident.backgroundImageUrls.length]);

  if (!resident) {
    return <div className="text-white">Resident not found</div>;
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${resident.backgroundImageUrls[currentImageIndex]})` }}
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
            <h2 className="text-4xl font-bold mb-2">{resident.name}</h2>
            <p className="text-lg opacity-80">{resident.bio}</p>
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
                <ResidentPlayer
                    residentName={resident.name}
                    djImageUrl={resident.djImageUrl}
                    audioUrl={resident.audioUrl}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResidentPage;

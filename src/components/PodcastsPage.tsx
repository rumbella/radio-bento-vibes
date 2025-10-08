import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import type { Podcast } from '../types';

import 'swiper/css';
import 'swiper/css/free-mode';

const PodcastsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const podcasts: Podcast[] = [
    {
      id: '1',
      title: 'Electronic Music Evolution',
      description: 'A deep dive into how electronic music has evolved over the decades, featuring interviews with pioneering artists and producers.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
      duration: '45:32',
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Behind the Mix: Studio Secrets',
      description: 'Discover the techniques and tools used by top DJs and producers to create their signature sounds.',
      image: 'https://placehold.co/600x400',
      duration: '32:18',
      date: '2024-01-10'
    },
    {
      id: '3',
      title: 'Festival Culture Around the World',
      description: 'Exploring the unique festival cultures from Ibiza to Berlin, and how they shape the electronic music scene.',
      image: 'https://placehold.co/600x400',
      duration: '38:45',
      date: '2024-01-05'
    },
    {
      id: '4',
      title: 'The Future of Sound',
      description: 'What does the future hold for electronic music? We discuss emerging technologies and trends.',
      image: 'https://placehold.co/600x400',
      duration: '41:22',
      date: '2023-12-28'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full flex flex-col px-4 lg:px-8 py-6">
      <h2 className="text-white font-bold text-2xl mb-6">Ascolta in</h2>
      
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        className="w-full"
      >
        {podcasts.map((podcast) => (
          <SwiperSlide key={podcast.id} className="!w-auto">
            <div 
              className="w-[180px] lg:w-[220px] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/podcast/${podcast.id}`)}
            >
              {/* Immagine */}
              <div className="w-full h-[180px] lg:h-[220px] rounded-lg overflow-hidden">
                <img 
                  src={podcast.image} 
                  alt={podcast.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Testo sotto l'immagine */}
              <div className="mt-3 px-1">
                <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 mb-1">
                  {podcast.title}
                </h3>
                <p className="text-gray-400 text-xs lg:text-sm">
                  {podcast.duration} • {formatDate(podcast.date)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PodcastsPage;

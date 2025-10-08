import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import type { Resident } from '../types';

import 'swiper/css';
import 'swiper/css/free-mode';

const ResidentsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const originalResidents: Resident[] = [
    {
      id: '1',
      name: 'DJ Marco',
      bio: 'Marco brings over 10 years of experience in deep house and techno. His morning shows are the perfect way to start your day with positive energy.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754294998/Schermata_2020-04-13_alle_20.25.01_brwvys.png',
      shows: ['Morning Vibes', 'Weekend Deep Sessions'],
      socialLinks: {
        instagram: 'https://instagram.com/djmarco',
        soundcloud: 'https://soundcloud.com/djmarco',
        mixcloud: 'https://mixcloud.com/djmarco'
      }
    },
    {
      id: '2',
      name: 'Sara Mix',
      bio: 'Sara is our electronic music specialist with a passion for discovering new artists. She curates the perfect lunch break soundtrack.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754294960/7488-7d7f-4931-aa4c-01e4f93d3279_jjkinc.png',
      shows: ['Lunch Break Beats', 'New Music Friday'],
      socialLinks: {
        instagram: 'https://instagram.com/saramix',
        soundcloud: 'https://soundcloud.com/saramix'
      }
    },
    {
      id: '3',
      name: 'Alex Deep',
      bio: 'Alex specializes in progressive house and ambient sounds. His evening sessions are designed to help you unwind after a long day.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754294921/6688-af9a-4e1c-9373-edf1c47164e9_ydrkce.jpg',
      shows: ['Evening Sessions', 'Midnight Ambient'],
      socialLinks: {
        instagram: 'https://instagram.com/alexdeep',
        mixcloud: 'https://mixcloud.com/alexdeep'
      }
    },
    {
      id: '4',
      name: 'Luna Beats',
      bio: 'Luna brings the underground scene to Radio Amblè with her selection of cutting-edge electronic music and exclusive mixes.',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754314593/b663-8e1c-4bf8-975e-ec025ce7c823_1_gbsrm2.png',
      shows: ['Underground Sounds', 'Late Night Sessions'],
      socialLinks: {
        instagram: 'https://instagram.com/lunabeats',
        soundcloud: 'https://soundcloud.com/lunabeats',
        mixcloud: 'https://mixcloud.com/lunabeats'
      }
    }
  ];

  const residents = [...originalResidents, ...originalResidents];

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 lg:px-8">
      <h2 className="text-white font-bold text-2xl mb-6">Ascolta in</h2>
      
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-screen -translate-x-1/2 left-1/2"
      >
        {residents.map((resident, index) => (
          <SwiperSlide key={`${resident.id}-${index}`} className="!w-auto">
            <div 
              className="w-[160px] lg:w-[300px] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/resident/${resident.id}`)}
            >
              {/* Immagine */}
              <div className="w-full h-[160px] lg:h-[300px] rounded-3xl overflow-hidden">
                <img 
                  src={resident.image} 
                  alt={resident.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Testo sotto l'immagine */}
              <div className="mt-3 px-1">
                <h3 className="text-white font-semibold text-sm lg:text-base line-clamp-2 mb-1">
                  {resident.name}
                </h3>
                <p className="text-gray-400 text-xs lg:text-sm">
                  {resident.shows.length} show{resident.shows.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ResidentsPage;

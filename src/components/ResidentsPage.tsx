import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Users, Instagram, Music2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Resident } from '../types';
import { cn } from '../lib/utils';
import type { Swiper as SwiperCore } from 'swiper';

const AUTOPLAY_DELAY = 5000;

const ResidentsPage: React.FC = () => {
  const residents: Resident[] = [
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

  const swiperRef = useRef<SwiperCore | null>(null);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={18} />;
      case 'soundcloud':
      case 'mixcloud':
        return <Music2 size={18} />;
      default:
        return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="text-liquid-lava" size={24} />
        <h2 className="text-white font-bold text-2xl">Our Residents</h2>
      </div>

      <div className="relative w-full max-w-6xl">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation, Pagination]}
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-residents',
          }}
          navigation={{
            nextEl: '.swiper-button-next-residents',
            prevEl: '.swiper-button-prev-residents',
          }}
          className="w-full"
        >
          {residents.map((resident) => (
            <SwiperSlide
              key={resident.id}
              className="h-auto"
            >
              <div className="bg-gluon-grey/80 backdrop-blur-md rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="relative h-48">
                  <img
                    src={resident.image}
                    alt={resident.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2">{resident.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {resident.shows.map((show, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-black text-xs px-3 py-1 rounded-full font-medium"
                        >
                          {show}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-white text-sm leading-relaxed mb-6 flex-1">
                    {resident.bio}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-white text-sm font-medium">Follow:</span>
                    {Object.entries(resident.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-liquid-lava transition-colors"
                      >
                        {getSocialIcon(platform)}
                        <span className="text-sm capitalize">{platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="swiper-button-prev-residents absolute top-1/2 left-0 -translate-x-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="swiper-button-next-residents absolute top-1/2 right-0 translate-x-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="swiper-pagination-residents mt-8"></div>

    </div>
  );
};

export default ResidentsPage;
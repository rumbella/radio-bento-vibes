import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import type { Playlist } from '../types';
import { cn } from '../lib/utils';
import type { Swiper as SwiperCore } from 'swiper';

const AUTOPLAY_DELAY = 4000;

const PlaylistsPage: React.FC = () => {
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Deep House',
      description: 'The best deep house tracks for your soul',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
        { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
        { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
      ]
    },
    {
      id: '2',
      name: 'Morning Energy',
      description: 'Uplifting beats to start your day',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
        { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
        { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
      ]
    },
    {
      id: '3',
      name: 'Chill Vibes',
      description: 'Relaxing sounds for peaceful moments',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '7', title: 'Weightless', artist: 'Marconi Union', duration: '8:08', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
        { id: '8', title: 'Porcelain', artist: 'Moby', duration: '4:01', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
        { id: '9', title: 'Kiara', artist: 'Bonobo', duration: '5:27', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
      ]
    },
    {
        id: '4',
        name: 'Techno',
        description: 'The best deep house tracks for your soul',
        image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
        tracks: [
          { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
          { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
          { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
        ]
      },
      {
        id: '5',
        name: 'Afro House',
        description: 'Uplifting beats to start your day',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
        tracks: [
          { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
          { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
          { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
        ]
      },
  ];

  const swiperRef = useRef<SwiperCore | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const getTotalDuration = (tracks: any[]) => {
    const totalSeconds = tracks.reduce((acc, track) => {
      const [minutes, seconds] = track.duration.split(':').map(Number);
      return acc + minutes * 60 + seconds;
    }, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4" style={{ height: '80vh' }}>
      <div className="relative w-full h-[50vh] md:h-[45vh] lg:h-[40vh] xl:h-[48vh]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation]}
          loop={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={16}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
          onAutoplayTimeLeft={(s, time, progress) => {
            setProgress(1 - progress);
          }}
          className="w-full h-full"
        >
          {playlists.map((playlist, index) => (
            <SwiperSlide
              key={playlist.id}
              className={cn(
                'flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_45%] min-w-0 transition-transform duration-300 ease-out h-full',
                index === selectedIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
              )}
              style={{
                width: '80%',
                maxWidth: '400px'
              }}
            >
              <div className="bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden h-full">
                <div className="relative h-full">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {index === selectedIndex && (
                    <Link to={`/playlist/${playlist.id}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-10">
                      <Play size={24} className="fill-black" />
                    </Link>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-text-main font-bold text-xl mb-1">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{playlist.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span>{playlist.tracks.length} tracks</span>
                        <span>•</span>
                        <span>{getTotalDuration(playlist.tracks)}</span>
                      </div>
                      <Link to={`/playlist/${playlist.id}`} className="bg-transparent text-white p-2 rounded-full transition-colors hover:bg-white/10">
                        <ArrowUpRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className="swiper-button-prev absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hidden md:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="swiper-button-next absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hidden md:block"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Autoplay Progress Indicator - Outside Slider */}
      <div className="w-32 h-1 bg-white/30 rounded-full mt-8 mx-auto">
        <div
          className="h-1 bg-white rounded-full transition-all"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PlaylistsPage;
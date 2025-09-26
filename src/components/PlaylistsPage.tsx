import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Play, Clock, Music } from 'lucide-react';
import type { Playlist } from '../types';
import { cn } from '../lib/utils';

const PlaylistsPage: React.FC = () => {
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Deep House',
      description: 'The best deep house tracks for your soul',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
      tracks: [
        { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03' },
        { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32' },
        { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29' }
      ]
    },
    {
      id: '2',
      name: 'Morning Energy',
      description: 'Uplifting beats to start your day',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
      tracks: [
        { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20' },
        { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02' },
        { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05' }
      ]
    },
    {
      id: '3',
      name: 'Chill Vibes',
      description: 'Relaxing sounds for peaceful moments',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
      tracks: [
        { id: '7', title: 'Weightless', artist: 'Marconi Union', duration: '8:08' },
        { id: '8', title: 'Porcelain', artist: 'Moby', duration: '4:01' },
        { id: '9', title: 'Kiara', artist: 'Bonobo', duration: '5:27' }
      ]
    },
    {
        id: '4',
        name: 'Techno',
        description: 'The best deep house tracks for your soul',
        image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
        tracks: [
          { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03' },
          { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32' },
          { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29' }
        ]
      },
      {
        id: '5',
        name: 'Afro House',
        description: 'Uplifting beats to start your day',
        image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
        tracks: [
          { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20' },
          { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02' },
          { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05' }
        ]
      },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

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
    <div className="w-full h-[calc(100vh-12rem)] lg:h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              className={cn(
                'flex-[0_0_80%] md:flex-[0_0_40%] min-w-0 pl-4 transition-transform duration-300 ease-out h-full',
                index === selectedIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-50'
              )}
            >
              <div className="bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden h-full">
                {/* Playlist Header */}

                <div className="relative h-full">

                <div className="relative">

                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-text-main font-bold text-xl mb-1">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{playlist.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <span>{playlist.tracks.length} tracks</span>
                        <span>•</span>
                        <span>{getTotalDuration(playlist.tracks)}</span>
                      </div>
                      <button className="bg-liquid-lava hover:bg-liquid-lava/80 text-text-main p-3 rounded-full transition-colors">
                        <Play size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsPage;

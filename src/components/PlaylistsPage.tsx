import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import type { Playlist } from '../types';
import { cn } from '../lib/utils';
import { useUIState } from '../contexts/UIContext';

const PlaylistsPage: React.FC = () => {
  const { playlists, isLoading, error } = useUIState();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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

  if (isLoading) {
    return <div className="content-container"><div className="spinner"></div></div>;
  }

  if (error) {
    return <div className="content-container text-center p-4"><p>{error}</p></div>;
  }

  return (
    <div className="w-full h-[60vh] md:h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
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
                  <div className="relative h-full group">
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-white text-black p-4 rounded-full shadow-lg transition-all transform scale-0 group-hover:scale-100 hover:!scale-110 z-10">
                        <Play size={24} className="fill-black" />
                      </button>
                    </div>

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
              </div>
            ))}
          </div>
        </div>

        <button
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hidden md:block"
          onClick={scrollPrev}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hidden md:block"
          onClick={scrollNext}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistsPage;
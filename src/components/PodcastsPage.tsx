import React from 'react';
import { Play, Calendar, Clock, Mic } from 'lucide-react';
import type { Podcast } from '../types';

const PodcastsPage: React.FC = () => {
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
    <div className="bg-background-dark max-w-md mx-auto lg:max-w-4xl p-4 lg:p-8 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Mic className="text-liquid-lava" size={24} />
        <h2 className="text-text-main font-bold text-2xl">Podcasts</h2>
      </div>

      {/* Featured Podcast */}
      <div className="bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="relative h-56">
          <img
            src={podcasts[0].image}
            alt={podcasts[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-liquid-lava text-text-main text-xs px-3 py-1 rounded-full font-medium">
              Latest Episode
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-text-main font-bold text-xl mb-2">{podcasts[0].title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {podcasts[0].description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{formatDate(podcasts[0].date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{podcasts[0].duration}</span>
                </div>
              </div>
              <button className="bg-liquid-lava hover:bg-liquid-lava/80 text-text-main p-3 rounded-full transition-colors">
                <Play size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Episodes */}
      <div>
        <h3 className="text-text-main font-semibold text-lg mb-4">All Episodes</h3>
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-container-dark backdrop-blur-md rounded-xl p-4 hover:bg-slate-grey/30 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-main font-medium text-lg mb-2 line-clamp-1">
                    {podcast.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {podcast.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(podcast.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{podcast.duration}</span>
                      </div>
                    </div>
                    <button className="bg-liquid-lava/20 hover:bg-liquid-lava text-liquid-lava hover:text-text-main p-2 rounded-full transition-colors">
                      <Play size={16} />
                    </button>
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

export default PodcastsPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Mic } from 'lucide-react';
import type { Podcast } from '../types';

// Mock data conforming to the new types
const podcasts: Podcast[] = [
  {
    id: '1',
    name: 'Tech Talks',
    description: 'Exploring the latest in technology and innovation.',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    episodes: [
      { id: '1', title: 'The Future of AI', duration: '45:12' },
      { id: '2', title: 'Quantum Computing Explained', duration: '55:30' },
      { id: '3', title: 'The Rise of Serverless', duration: '38:45' }
    ]
  },
  {
    id: '2',
    name: 'Design Matters',
    description: 'Conversations about design and creativity.',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    episodes: [
      { id: '4', title: 'The Principles of Good Design', duration: '50:20' },
      { id: '5', title: 'UI vs. UX: What\'s the Difference?', duration: '42:15' },
      { id: '6', title: 'The Power of Typography', duration: '35:55' }
    ]
  },
];

const PodcastsPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto lg:max-w-4xl p-4 lg:p-8 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Mic className="text-liquid-lava" size={24} />
        <h2 className="text-text-main font-bold text-2xl">Podcasts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {podcasts.map((podcast) => (
          <Link to={`/podcast/${podcast.id}`} key={podcast.id} className="block bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden hover:bg-slate-grey/30 transition-colors group">
            <div className="relative">
              <img
                src={podcast.image}
                alt={podcast.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-text-main font-bold text-xl mb-1">{podcast.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{podcast.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PodcastsPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import DetailLayout from '../components/DetailLayout';
import type { Podcast, Episode } from '../types';

// Mock data - in a real app, this would come from a context or API call
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

const SingleEpisodePage: React.FC = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId: string }>();
  const podcast = podcasts.find(p => p.id === id);
  const episode = podcast?.episodes.find(e => e.id === episodeId);

  if (!episode) {
    return <div className="text-white text-center p-8">Episode not found</div>;
  }

  return (
    <DetailLayout to={`/podcast/${id}`}>
      <div className="p-4 h-full text-white flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gluon-grey/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
            <img src={podcast?.image} alt={podcast?.name} className="w-full h-64 object-cover"/>
            <div className="p-6">
              <h1 className="text-4xl font-bold">{episode.title}</h1>
              <p className="text-gray-300 mt-2 text-2xl">{podcast?.name}</p>
            </div>
            <div className="p-6 bg-black/20">
              <div className="w-full h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Media Player Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailLayout>
  );
};

export default SingleEpisodePage;
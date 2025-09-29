import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DetailLayout from '../components/DetailLayout';
import type { Podcast, Episode } from '../types';
import { Clock, Play } from 'lucide-react';

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

const SinglePodcastPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = podcasts.find(p => p.id === id);

  if (!podcast) {
    return <div className="text-white text-center p-8">Podcast not found</div>;
  }

  const getTotalDuration = (episodes: any[]) => {
    const totalSeconds = episodes.reduce((acc, episode) => {
      const [minutes, seconds] = episode.duration.split(':').map(Number);
      return acc + minutes * 60 + seconds;
    }, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <DetailLayout to="/podcasts">
      <div className="p-4 h-full text-white">
        <div className="flex flex-grow space-x-4 overflow-hidden h-[calc(100vh-160px)]">
          {/* Left Column: Podcast Info */}
          <div
            className="relative flex-1 bg-cover bg-center rounded-lg shadow-lg bg-gluon-grey/80 backdrop-blur-md "
            style={{ backgroundImage: `url(${podcast.image})` }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-lg">
              <h1 className="text-5xl font-bold">{podcast.name}</h1>
              <p className="text-gray-300 mt-2 text-lg">{podcast.description}</p>
              <div className="flex items-center space-x-4 text-gray-300 text-sm mt-3">
                <span>{podcast.episodes.length} episodes</span>
                <span>•</span>
                <span>{getTotalDuration(podcast.episodes)}</span>
              </div>
              <button className="mt-6 bg-liquid-lava text-white py-3 px-8 rounded-full flex items-center justify-center gap-2 font-bold transition-transform hover:scale-105">
                <Play size={20} className="fill-white" />
                Play All
              </button>
            </div>
          </div>

          {/* Right Column: Episode List */}
          <div className="w-2/5 flex flex-col">
            <div className="bg-black/30 rounded-lg p-4 flex-grow overflow-y-auto bg-gluon-grey/80 backdrop-blur-md rounded shadow-lg">
              <div className="grid grid-cols-[2rem_1fr_auto] gap-4 items-center text-gray-400 uppercase text-sm border-b border-gray-700 pb-2 mb-2 sticky top-0 bg-black/30 z-10">
                <span className="text-center">#</span>
                <span>Title</span>
                <Clock size={16} />
              </div>
              <div className="space-y-1">
                {podcast.episodes.map((episode, index) => (
                  <Link
                    to={`/podcast/${id}/episode/${episode.id}`}
                    key={episode.id}
                    className="grid grid-cols-[2rem_1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition-colors"
                  >
                    <span className="text-gray-400 text-center">{index + 1}</span>
                    <span className="font-medium truncate">{episode.title}</span>
                    <span className="text-gray-400">{episode.duration}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailLayout>
  );
};

export default SinglePodcastPage;
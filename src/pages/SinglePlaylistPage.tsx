import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DetailLayout from '../components/DetailLayout';
import Player from '../components/Player';
import type { Playlist, Track } from '../types';
import { Clock, Play } from 'lucide-react';

// Mock data - in a real app, this would come from a context or API call
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Deep House',
    description: 'The best deep house tracks for your soul',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
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
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
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
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
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
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
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
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20' },
        { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02' },
        { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05' }
      ]
    },
];


const SinglePlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playlist = playlists.find(p => p.id === id);

  if (!playlist) {
    return <div className="text-white text-center p-8">Playlist not found</div>;
  }

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
    <DetailLayout to="/playlists">
      <div className="flex flex-col h-full text-white">
        {/* Main content area */}
        <main className="flex-1 flex flex-row space-x-4 p-4 pt-16 overflow-hidden">
          {/* Left Column: Playlist Info */}
          <div
            className="relative flex-1 bg-cover bg-center rounded-3xl shadow-lg bg-gluon-grey/80 backdrop-blur-md"
            style={{ backgroundImage: `url(${playlist.image})` }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-lg">
              <h1 className="text-5xl font-bold">{playlist.name}</h1>
              <p className="text-gray-300 mt-2 text-lg">{playlist.description}</p>
              <div className="flex items-center space-x-4 text-gray-300 text-sm mt-3">
                <span>{playlist.tracks.length} tracks</span>
                <span>•</span>
                <span>{getTotalDuration(playlist.tracks)}</span>
              </div>
              <button className="mt-6 bg-liquid-lava text-white py-3 px-8 rounded-full flex items-center justify-center gap-2 font-bold transition-transform hover:scale-105">
                <Play size={20} className="fill-white" />
                Play All
              </button>
            </div>
          </div>

          {/* Right Column: Track List */}
          <div className="w-2/5 flex flex-col min-h-0">
            <div className="bg-black/30 rounded-3xl p-4 flex-grow overflow-y-auto bg-gluon-grey/80 backdrop-blur-md shadow-lg">
              <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center text-gray-400 uppercase text-sm border-b border-gray-700 pb-2 mb-2 sticky top-0 bg-black/30 z-10">
                <span className="text-center">#</span>
                <span>Title</span>
                <span>Artist</span>
                <Clock size={16} />
              </div>
              <div className="space-y-1">
                {playlist.tracks.map((track, index) => (
                  <Link
                    to={`/playlist/${id}/song/${track.id}`}
                    key={track.id}
                    className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition-colors"
                  >
                    <span className="text-gray-400 text-center">{index + 1}</span>
                    <span className="font-medium truncate">{track.title}</span>
                    <span className="text-gray-400 truncate">{track.artist}</span>
                    <span className="text-gray-400">{track.duration}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Player */}
        <footer className="flex-shrink-0 p-4">
          <Player />
        </footer>
      </div>
    </DetailLayout>
  );
};

export default SinglePlaylistPage;
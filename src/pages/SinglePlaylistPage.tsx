import React from 'react';
import { useParams } from 'react-router-dom';
import type { Playlist, Track } from '../types';
import { Clock } from 'lucide-react';
import RadioPlayer from '../components/RadioPlayer';

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
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758714158/1758714007182-679c260b-9ed1-4078-8502-2176ff6bfa41_ihqh3f.png',
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
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1758714241/1758714137173-ac8f5ced-b1f9-48e1-9d1e-e8550fff56ca_chjfs9.png',
    tracks: [
      { id: '7', title: 'Weightless', artist: 'Marconi Union', duration: '8:08' },
      { id: '8', title: 'Porcelain', artist: 'Moby', duration: '4:01' },
      { id: '9', title: 'Kiara', artist: 'Bonobo', duration: '5:27' }
    ]
  },
];

const SinglePlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playlist = playlists.find(p => p.id === id);

  if (!playlist) {
    return <div className="text-white text-center p-8">Playlist not found</div>;
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Full Background Image */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${playlist.image}')`
          }}
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Section - DESKTOP */}
      <div className="hidden lg:block lg:w-[65%] p-4">
        <div className="h-full text-white relative z-10">
          <h1 className="text-4xl font-bold">{playlist.name}</h1>
          <p className="text-lg mt-2">{playlist.description}</p>

          {/* Tracklist */}
          <div className="mt-8">
            <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center text-gray-300 uppercase text-xs border-b border-white/20 pb-2">
              <span>#</span>
              <span>Title</span>
              <span>Artist</span>
              <Clock size={16} />
            </div>
            <div className="mt-2 space-y-1 h-[calc(100vh-24rem)] overflow-y-auto">
              {playlist.tracks.map((track, index) => (
                <div key={track.id} className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
                  <span className="text-gray-400">{index + 1}</span>
                  <span className="font-medium">{track.title}</span>
                  <span className="text-gray-400">{track.artist}</span>
                  <span className="text-gray-400">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile view is simplified and not part of the core task */}
      <div className="lg:hidden">
        {/* Mobile content can be adapted here if needed */}
      </div>

      {/* Right Column (Radio Player) */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[160px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-full lg:ml-auto z-10">
        <RadioPlayer />
      </div>
    </div>
  );
};

export default SinglePlaylistPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import type { Playlist } from '../types';
import { Clock } from 'lucide-react';
import PlaylistPlayer from '../components/music/PlaylistPlayer';

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
    <div className="h-[calc(100vh-12rem)] flex flex-col lg:flex-row relative mx-auto px-4 lg:px-8">
      {/* Fixed Background Image */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/thinkdigital/image/upload/v1751631394/image-26_gbim0w.png')`
          }}
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Left Column: Track List - DESKTOP (65%) */}
      <div className="hidden lg:block lg:w-[65%] p-4 relative z-10">
        <div className="h-[calc(100vh-12rem)] bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl p-6 overflow-hidden flex flex-col">
          <h2 className="text-2xl font-bold mb-4">{playlist.name}</h2>
          <p className="text-gray-300 text-sm mb-6">{playlist.description}</p>
          
          {/* Track List Header */}
          <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center text-gray-400 uppercase text-xs border-b border-gray-600 pb-3 mb-3">
            <span className="text-center">#</span>
            <span>Title</span>
            <span>Artist</span>
            <Clock size={14} />
          </div>

          {/* Track List - Scrollable */}
          <div className="flex-1 overflow-y-auto space-y-1">
            {playlist.tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-3 rounded-md hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <span className="text-gray-400 text-center text-sm">{index + 1}</span>
                <span className="font-medium truncate group-hover:text-white">{track.title}</span>
                <span className="text-gray-400 truncate group-hover:text-gray-300">{track.artist}</span>
                <span className="text-gray-400 text-sm">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Track List */}
      <div className="lg:hidden relative z-10 flex-1 overflow-y-auto mb-[180px] px-2 pt-4">
        <div className="bg-gluon-grey/80 backdrop-blur-md border-none text-white rounded-2xl p-4">
          <h2 className="text-xl font-bold mb-2">{playlist.name}</h2>
          <p className="text-gray-300 text-xs mb-4">{playlist.description}</p>
          
          <div className="space-y-2">
            {playlist.tracks.map((track, index) => (
              <div 
                key={track.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm">{track.title}</p>
                    <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs ml-2">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Playlist Player - Mobile: fixed bottom, Desktop: right side (35%) */}
      <div className="fixed bottom-[110px] left-4 right-4 h-[160px] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-[calc(100vh-12rem)] lg:ml-auto z-10">
        <PlaylistPlayer 
          tracks={playlist.tracks}
          playlistName={playlist.name}
          playlistImage={playlist.image}
        />
      </div>
    </div>
  );
};

export default SinglePlaylistPage;
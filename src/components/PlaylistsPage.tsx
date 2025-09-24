import React from 'react';
import { Play, Clock, Music } from 'lucide-react';
import type { Playlist } from '../types';

const PlaylistsPage: React.FC = () => {
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Deep House',
      description: 'The best deep house tracks for your soul',
      image: 'https://placehold.co/600x400',
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
      image: 'https://placehold.co/600x400',
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
      image: 'https://placehold.co/600x400',
      tracks: [
        { id: '7', title: 'Weightless', artist: 'Marconi Union', duration: '8:08' },
        { id: '8', title: 'Porcelain', artist: 'Moby', duration: '4:01' },
        { id: '9', title: 'Kiara', artist: 'Bonobo', duration: '5:27' }
      ]
    }
  ];

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
    <div className="max-w-md mx-auto lg:max-w-4xl p-4 lg:p-8 space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Music className="text-liquid-lava" size={24} />
        <h2 className="text-text-main font-bold text-2xl">Playlists</h2>
      </div>

      <div className="space-y-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden"
          >
            {/* Playlist Header */}
            <div className="relative h-48">
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

            {/* Track List */}
            <div className="p-4">
              <div className="space-y-2">
                {playlist.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-grey/30 transition-colors group"
                  >
                    <span className="text-gray-400 text-sm w-6 text-center group-hover:hidden">
                      {index + 1}
                    </span>
                    <button className="text-liquid-lava hidden group-hover:block">
                      <Play size={16} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-text-main font-medium truncate">{track.title}</p>
                      <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Clock size={14} />
                      <span>{track.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsPage;

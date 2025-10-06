import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ListMusic, ArrowUpRight } from 'lucide-react';
import type { Playlist } from '../types';

const PlaylistsPage: React.FC = () => {
  const playlists: Playlist[] = [
    {
      id: '1',
      name: 'Deep House',
      description: 'The best deep house tracks for your soul',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
        { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
        { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
      ]
    },
    {
      id: '2',
      name: 'Morning Energy',
      description: 'Uplifting beats to start your day',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
        { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
        { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
      ]
    },
    {
      id: '3',
      name: 'Chill Vibes',
      description: 'Relaxing sounds for peaceful moments',
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
      tracks: [
        { id: '7', title: 'Weightless', artist: 'Marconi Union', duration: '8:08', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
        { id: '8', title: 'Porcelain', artist: 'Moby', duration: '4:01', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
        { id: '9', title: 'Kiara', artist: 'Bonobo', duration: '5:27', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
      ]
    },
    {
        id: '4',
        name: 'Techno',
        description: 'The best deep house tracks for your soul',
        image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
        tracks: [
          { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
          { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
          { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
        ]
      },
      {
        id: '5',
        name: 'Afro House',
        description: 'Uplifting beats to start your day',
        image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
        tracks: [
          { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3' },
          { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3' },
          { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3' }
        ]
      },
  ];

  const featuredPlaylist = playlists[0];
  const otherPlaylists = playlists.slice(1);

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
        <ListMusic className="text-liquid-lava" size={24} />
        <h2 className="text-text-main font-bold text-2xl">Playlists</h2>
      </div>

      {/* Featured Playlist */}
      <div className="bg-container-dark backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="relative h-56">
          <img
            src={featuredPlaylist.image}
            alt={featuredPlaylist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-liquid-lava text-text-main text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to={`/playlist/${featuredPlaylist.id}`} className="bg-white text-black p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-10">
              <Play size={24} className="fill-black" />
            </Link>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-text-main font-bold text-xl mb-2">{featuredPlaylist.name}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {featuredPlaylist.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>{featuredPlaylist.tracks.length} tracks</span>
                <span>•</span>
                <span>{getTotalDuration(featuredPlaylist.tracks)}</span>
              </div>
               <Link to={`/playlist/${featuredPlaylist.id}`} className="bg-transparent text-white p-2 rounded-full transition-colors hover:bg-white/10">
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* All Playlists */}
      <div>
        <h3 className="text-text-main font-semibold text-lg mb-4">All Playlists</h3>
        <div className="space-y-4">
          {otherPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-container-dark backdrop-blur-md rounded-xl p-4 hover:bg-slate-grey/30 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-main font-medium text-lg mb-2 line-clamp-1">
                    {playlist.name}
                  </h4>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {playlist.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-gray-400 text-sm">
                      <span>{playlist.tracks.length} tracks</span>
                      <span>•</span>
                      <span>{getTotalDuration(playlist.tracks)}</span>
                    </div>
                    <Link to={`/playlist/${playlist.id}`} className="bg-white hover:bg-gray-200 text-black p-2 rounded-full transition-colors">
                      <Play size={16} fill="black" />
                    </Link>
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
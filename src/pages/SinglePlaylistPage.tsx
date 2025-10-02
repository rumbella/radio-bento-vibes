import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Playlist } from '../types';
import { Clock } from 'lucide-react';
import PlaylistPlayer from '../components/music/PlaylistPlayer';

const DEFAULT_BACKGROUND = 'https://res.cloudinary.com/thinkdigital/image/upload/v1756910411/500501bc6a3eaca283c3c4951e15cc01_esu1fv.jpg';

// Mock data - in a real app, this would come from a context or API call
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


const SinglePlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const playlist = playlists.find(p => p.id === id);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  if (!playlist) {
    return <div className="text-white text-center p-8">Playlist not found</div>;
  }

  // Get background image from current track or use default
  const currentBackground = playlist.tracks[currentTrackIndex]?.audioUrl 
    ? DEFAULT_BACKGROUND 
    : DEFAULT_BACKGROUND;

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
    <div className="h-full flex flex-col lg:flex-row lg:items-center lg:justify-between relative mx-auto px-4 lg:px-[90px]">
      {/* Dynamic Background Image */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{
            backgroundImage: `url('${currentBackground}')`
          }}
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Left Column: Track List - DESKTOP (65%) */}
      <div className="hidden lg:block lg:w-[65%] relative z-10 lg:h-[60vh]">
        <div className="h-full bg-gluon-grey/20 backdrop-blur-md border-none text-white rounded-2xl p-6 overflow-hidden flex flex-col">
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
      <div className="lg:hidden relative z-10 flex-1 overflow-y-auto mb-[220px] px-2 pt-20">
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
      <div className="fixed bottom-4 left-4 right-4 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[35%] lg:h-[60vh] z-10">
        <PlaylistPlayer 
          tracks={playlist.tracks}
          playlistName={playlist.name}
          playlistImage={playlist.image}
          currentTrackIndex={currentTrackIndex}
          onTrackChange={setCurrentTrackIndex}
        />
      </div>
    </div>
  );
};

export default SinglePlaylistPage;

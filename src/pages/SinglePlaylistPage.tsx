import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Playlist } from '../types';
import PlaylistPlayer from '../components/music/PlaylistPlayer';
import PlaylistDropdown from '../components/music/PlaylistDropdown'; // Import the new component

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

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between relative p-4 lg:p-8">
      {/* Dynamic Background Image */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${DEFAULT_BACKGROUND}')` }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Top Section: Playlist Dropdown */}
      <PlaylistDropdown playlist={playlist} onTrackSelect={handleTrackSelect} />

      {/* Bottom Section: Playlist Player */}
      <div className="w-full max-w-lg z-10">
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

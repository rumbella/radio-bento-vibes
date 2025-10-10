import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Playlist } from '../types';
import PlaylistPlayer from '../components/music/PlaylistPlayer';
import DetailNav from '../components/ui/DetailNav';
import ShareBar from '../components/ui/ShareBar';

// Mock data - in a real app, this would come from a context or API call
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Deep House',
    description: 'The best deep house tracks for your soul',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    tracks: [
      { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3', backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1760087524/artworks-000012560643-t526va-t1080x1080_jxlikn.jpg' },
      { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3', backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1759787126/deadmau5-press-photo-2016-billboard-1548_ygsmbm.webp' },
      { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', audioUrl: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3', backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1759787379/maxresdefault_pmyuzy.jpg' }
    ]
  },
  {
    id: '2',
    name: 'Morning Energy',
    description: 'Uplifting beats to start your day',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    tracks: [
      { id: '4', title: 'One More Time', artist: 'Daft Punk', duration: '5:20', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1760087542/1366x768_cmsv2_fbd8e6b0-9e66-50c4-aa7f-3d97a2960768-8210240_cvzurc.webp' },
      { id: '5', title: 'Levels', artist: 'Avicii', duration: '6:02', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', backgroundImageUrl: 'https://images.genius.com/5cfae047f3f88cdfaf9520279d3a1a28.1000x1000x1.png' },
      { id: '6', title: 'Titanium', artist: 'David Guetta ft. Sia', duration: '4:05', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', backgroundImageUrl: 'https://res.cloudinary.com/thinkdigital/image/upload/v1759787379/maxresdefault_pmyuzy.jpg' }
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
  const title = "le playlist esclusive di Radio Amblè";

  if (!playlist) {
    return <div className="text-white text-center p-8">Playlist not found</div>;
  }

  const backgroundImageUrl = playlist.tracks[currentTrackIndex]?.backgroundImageUrl || playlist.image;

  return (
    <div className="h-full w-full flex flex-col relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 -z-10"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />

      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 lg:p-8">
        <DetailNav title={title} />
      </div>

      {/* Main Content Flex Container */}
      <div className="flex-grow flex flex-col lg:flex-row items-end lg:items-center relative z-10 p-4 lg:p-8 mt-[60px] lg:mt-0">

        {/* Left Content Area (Desktop) / Hidden on Mobile */}
        <div className="hidden lg:flex lg:flex-col lg:w-[65%] lg:h-full lg:justify-center text-white">
          <h2 className="text-4xl font-bold mb-2">{playlist.name}</h2>
          <p className="text-lg opacity-80">{playlist.description}</p>
          <div className="mt-8 w-full max-w-md">
            <ShareBar />
          </div>
        </div>

        {/* Player Container */}
        <div className="fixed bottom-[30px] left-4 right-4 z-20 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:w-[30%] lg:h-full flex lg:items-center">
          <div className="w-full flex flex-col gap-2">
            {/* Share Bar for Mobile - positioned above the player */}
            <div className="lg:hidden mb-1.5">
              <ShareBar />
            </div>

            {/* Player */}
            <PlaylistPlayer
              tracks={playlist.tracks}
              playlistName={playlist.name}
              playlistImage={playlist.image}
              currentTrackIndex={currentTrackIndex}
              onTrackChange={setCurrentTrackIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlaylistPage;
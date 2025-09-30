import React from 'react';
import { useParams } from 'react-router-dom';
import DetailLayout from '../components/DetailLayout';
import Player from '../components/Player';
import type { Playlist, Track } from '../types';
import { Clock, Play, Pause } from 'lucide-react';
import { usePlayerActions, usePlayerState, TrackInfo } from '../contexts/PlayerContext';

// Mock data - in a real app, this would come from a context or API call
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Deep House',
    description: 'The best deep house tracks for your soul',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    tracks: [
      { id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', url: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759239844/M83_Midnight_City_Official_video_dX3k_QDnzHE_vm7bf2.mp3', image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg' },
      { id: '2', title: 'Strobe', artist: 'Deadmau5', duration: '10:32', url: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243379/deadmau5_-_Strobe_tKi9Z-f6qX4_ntmclt.mp3', image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg' },
      { id: '3', title: 'Teardrop', artist: 'Massive Attack', duration: '5:29', url: 'https://res.cloudinary.com/thinkdigital/video/upload/v1759243385/Massive_Attack_-_Teardrop_Official_Video_u7K72X4eo_s_ersicy.mp3', image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg' }
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
  const { playPlaylistTrack, togglePlay } = usePlayerActions();
  const { currentTrack, isPlaying } = usePlayerState();

  if (!playlist) {
    return <div className="text-white text-center p-8">Playlist not found</div>;
  }

  const handlePlayClick = (track: Track, index: number) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      if (!track.url) return;

      const trackInfoList: TrackInfo[] = playlist.tracks
        .filter(t => t.url)
        .map(t => ({
          id: t.id,
          title: t.title,
          artist: t.artist,
          audioUrl: t.url!,
          imageUrl: t.image || playlist.image,
        }));

      const currentTrackInfo = trackInfoList.find(t => t.id === track.id);
      const newIndex = trackInfoList.findIndex(t => t.id === track.id);

      if (currentTrackInfo) {
        playPlaylistTrack(currentTrackInfo, trackInfoList, newIndex);
      }
    }
  };

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
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-b-3xl">
              <h1 className="text-5xl font-bold">{playlist.name}</h1>
              <p className="text-gray-300 mt-2 text-lg">{playlist.description}</p>
              <div className="flex items-center space-x-4 text-gray-300 text-sm mt-3">
                <span>{playlist.tracks.length} tracks</span>
                <span>•</span>
                <span>{getTotalDuration(playlist.tracks)}</span>
              </div>
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
                {playlist.tracks.map((track, index) => {
                  const isCurrentTrack = currentTrack?.id === track.id;
                  const isTrackPlaying = isCurrentTrack && isPlaying;

                  return (
                    <div
                      key={track.id}
                      onClick={() => track.url && handlePlayClick(track, index)}
                      className={`grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-2 rounded-md transition-colors group ${track.url ? 'cursor-pointer hover:bg-white/10' : 'opacity-50'}`}
                    >
                      <div className="flex items-center justify-center">
                        <button
                          className="bg-white text-black rounded-full w-7 h-7 flex items-center justify-center"
                          disabled={!track.url}
                        >
                          {isTrackPlaying ? (
                            <Pause size={16} className="fill-black" />
                          ) : (
                            <Play size={16} className="fill-black ml-0.5" />
                          )}
                        </button>
                      </div>
                      <span className="font-medium truncate">{track.title}</span>
                      <span className="text-gray-400 truncate">{track.artist}</span>
                      <span className="text-gray-400">{track.duration}</span>
                    </div>
                  );
                })}
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
import React from 'react';
import { useParams } from 'react-router-dom';
import type { Playlist, Track } from '../types';
import { Clock, Play } from 'lucide-react';

// Mock data - in a real app, this would come from a context or API call
const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Deep House',
    description: 'The best deep house tracks for your soul',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
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
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
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
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
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
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
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
      image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1754298552/png_1_odwcbw.png',
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
    <div className="w-full min-h-screen text-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img src={playlist.image} alt={playlist.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          <h1 className="text-3xl font-bold mt-4">{playlist.name}</h1>
          <p className="text-gray-400 mt-2">{playlist.description}</p>
          <div className="flex items-center space-x-4 text-gray-400 text-sm mt-4">
            <span>{playlist.tracks.length} tracks</span>
            <span>•</span>
            <span>{getTotalDuration(playlist.tracks)}</span>
          </div>
          <button className="mt-6 w-full bg-liquid-lava text-white py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-transform hover:scale-105">
            <Play size={20} className="fill-white" />
            Play All
          </button>
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center text-gray-400 uppercase text-sm border-b border-gray-700 pb-2">
              <span>#</span>
              <span>Title</span>
              <span>Artist</span>
              <Clock size={16} />
            </div>
            {playlist.tracks.map((track, index) => (
              <div key={track.id} className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition-colors">
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
  );
};

export default SinglePlaylistPage;
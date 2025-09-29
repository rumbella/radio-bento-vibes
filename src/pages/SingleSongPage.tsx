import React from 'react';
import { useParams } from 'react-router-dom';
import DetailLayout from '../components/DetailLayout';
import type { Playlist, Track } from '../types';

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

const SingleSongPage: React.FC = () => {
  const { id, songId } = useParams<{ id: string; songId: string }>();
  const playlist = playlists.find(p => p.id === id);
  const song = playlist?.tracks.find(t => t.id === songId);

  if (!song) {
    return <div className="text-white text-center p-8">Song not found</div>;
  }

  return (
    <DetailLayout to={`/playlist/${id}`}>
      <div className="p-4 h-full text-white flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-gluon-grey/80 backdrop-blur-md rounded-lg shadow-lg overflow-hidden">
            <img src={playlist?.image} alt={playlist?.name} className="w-full h-64 object-cover"/>
            <div className="p-6">
              <h1 className="text-4xl font-bold">{song.title}</h1>
              <p className="text-gray-300 mt-2 text-2xl">{song.artist}</p>
            </div>
            <div className="p-6 bg-black/20">
              <div className="w-full h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Media Player Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailLayout>
  );
};

export default SingleSongPage;
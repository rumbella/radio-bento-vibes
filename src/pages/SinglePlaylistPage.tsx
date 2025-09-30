import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DetailLayout from '../components/DetailLayout';
import type { Playlist } from '../types';
import { Clock, Play, MoreHorizontal, Heart } from 'lucide-react';

// Extened Playlist type to match the new design
interface ExtendedPlaylist extends Playlist {
  artist: string;
  totalSongs: number;
  cover: string;
  album: string;
  listeners: string;
}

// Mock data - in a real app, this would come from a context or API call
const playlists: ExtendedPlaylist[] = [
  {
    id: '1',
    name: 'Top Playlist',
    artist: 'Linkin Park',
    totalSongs: 241,
    listeners: '93.654',
    album: '#Choice',
    description: 'The best deep house tracks for your soul',
    image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1748272704/pexels-isabella-mendes-107313-860707_qjh3q1.jpg',
    cover: 'https://res.cloudinary.com/thinkdigital/image/upload/v1717518023/24_v3i5v7.png',
    tracks: [
      { id: '1', title: 'Say Yes to Heaven', artist: 'Lana Del Rey', duration: '6:45' , image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1717518022/23_n4o6fu.png'},
      { id: '2', title: 'Thinking of You', artist: 'Abc', duration: '2:57' , image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1717518022/22_rscb3b.png'},
      { id: '3', title: 'Only Girl (In the World)', artist: 'Rihanna', duration: '1:20' , image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1717518022/21_d3b3e7.png'},
      { id: '4', title: 'The Conspire of the Bird', artist: 'Artist', duration: '2:15' , image: 'https://res.cloudinary.com/thinkdigital/image/upload/v1717518022/20_j7q7b9.png'},
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
    <DetailLayout to="/playlists">
    <div className="p-4 h-full text-white flex items-center justify-center">
      <div className="w-full max-w-4xl bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 flex space-x-6">
          <div className="flex-1">
            <p className="text-sm text-gray-400">Artist</p>
            <h1 className="text-4xl font-bold">{playlist.artist}</h1>
            <p className="text-sm text-gray-400 mt-2">{playlist.totalSongs} song Total</p>
            <div className="mt-4 flex items-center space-x-4">
              <button className="bg-white/10 px-4 py-2 rounded-full text-sm font-semibold">
                Following
              </button>
              <button className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Play size={16} className="fill-white"/> Play all
              </button>
            </div>
          </div>
          <div className="w-48 h-48">
            <img src={playlist.cover} alt={playlist.name} className="w-full h-full object-cover rounded-lg"/>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-white/10">
          <nav className="flex space-x-8 text-sm font-medium text-gray-400">
            <a href="#" className="text-white border-b-2 border-white pb-2">Overview</a>
            <a href="#" className="hover:text-white">Related Artist</a>
            <a href="#" className="hover:text-white">Lyrics</a>
          </nav>
        </div>

        {/* Track List */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{playlist.name}</h2>
            <MoreHorizontal size={20} className="text-gray-400" />
          </div>

          <div className="space-y-2">
            {playlist.tracks.map((track, index) => (
              <Link
                to={`/playlist/${id}/song/${track.id}`}
                key={track.id}
                className="flex items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <img src={track.image} alt={track.title} className="w-10 h-10 rounded-md mr-4"/>
                <div className="flex-1">
                  <p className="font-semibold">{track.title}</p>
                </div>
                <div className="text-sm text-gray-400 mx-4">{playlist.album}</div>
                <div className="text-sm text-gray-400 mx-4">{playlist.listeners} Listened</div>
                <div className="text-sm text-gray-400 mx-4">{track.duration} sec</div>
                <Heart size={16} className="text-gray-400 hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </DetailLayout>
  );
};

export default SinglePlaylistPage;
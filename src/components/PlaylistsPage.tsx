import React, { useState } from 'react';
import { Heart, Headphones, MoreHorizontal, Play } from 'lucide-react';
import { mockPlaylists } from '../data/playlists';
import type { Track } from '../data/playlists';

// Helper function to format large numbers into a 'k' format
const formatListens = (count?: number): string => {
  if (!count) return '0';
  if (count >= 1000) {
    return `${Math.round(count / 1000)}k`;
  }
  return count.toString();
};

const PlaylistsPage: React.FC = () => {
  // We'll use the first playlist as our "Tracks of the Week"
  const playlist = mockPlaylists[0];

  // State to keep track of the currently active/playing track
  const [activeTrackId, setActiveTrackId] = useState<string | null>('track4');

  return (
    <div className="text-white p-4 sm:p-6 md:p-8 font-sans" style={{ backgroundColor: '#121212' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tracks Of The Week</h1>
          <a href="#" className="text-xs font-semibold tracking-widest text-gray-400 hover:text-white transition-colors">
            SEE ALL
          </a>
        </div>

        {/* Track List */}
        <div className="space-y-1">
          {playlist.tracks.map((track: Track) => {
            const isActive = track.id === activeTrackId;
            return (
              <div
                key={track.id}
                className={`grid grid-cols-12 gap-4 items-center p-2 rounded-lg cursor-pointer transition-colors ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
                onClick={() => setActiveTrackId(track.id)}
              >
                {/* Album Art */}
                <div className="col-span-1 relative flex items-center justify-center">
                  <img
                    src={track.imageUrl || 'https://placehold.co/100x100/121212/FFFFFF/png?text=404'}
                    alt={track.title}
                    className="w-10 h-10 rounded-md"
                  />
                  {isActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-md">
                      <Play className="text-white" size={20} />
                    </div>
                  )}
                </div>

                {/* Title & Artist */}
                <div className="col-span-5">
                  <p className={`font-medium truncate ${isActive ? 'text-green-400' : 'text-white'}`}>
                    {track.title}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                </div>

                {/* Duration */}
                <div className="col-span-1 text-gray-400 text-sm text-right">
                  {track.duration}
                </div>

                {/* Likes */}
                <div className="col-span-1 flex justify-center">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <Heart size={18} />
                  </button>
                </div>

                {/* Listens */}
                <div className="col-span-1 flex items-center text-gray-400 text-sm">
                  <Headphones size={18} className="mr-1" />
                  <span>{formatListens(track.listenCount)}</span>
                </div>

                {/* More Options */}
                <div className="col-span-1 flex justify-end">
                  {isActive && (
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsPage;

import React, { useState } from 'react';
import { Playlist, PlaylistTrack } from '../../types';
import { ChevronDown, Clock } from 'lucide-react';

interface PlaylistDropdownProps {
  playlist: Playlist;
  onTrackSelect: (index: number) => void; // To communicate with the player
}

const PlaylistDropdown: React.FC<PlaylistDropdownProps> = ({ playlist, onTrackSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto">
      <div className={`
        bg-gluon-grey/20 backdrop-blur-md border-none text-white rounded-2xl
        transition-all duration-500 ease-in-out overflow-hidden
        ${isOpen ? 'h-[70vh]' : 'h-24'}
      `}>
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-4">
              <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h2 className="text-xl font-bold">{playlist.name}</h2>
                <p className="text-gray-300 text-sm">{playlist.description}</p>
              </div>
            </div>
            <ChevronDown
              className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              size={28}
            />
          </div>

          {/* Tracklist (visible when open) */}
          <div className="flex-1 overflow-y-auto mt-4 pt-4 border-t border-gray-600">
            {/* Header */}
            <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center text-gray-400 uppercase text-xs pb-3 mb-3 sticky top-0 bg-gluon-grey/20">
              <span className="text-center">#</span>
              <span>Title</span>
              <span>Artist</span>
              <Clock size={14} />
            </div>
            {/* Tracks */}
            <div className="space-y-1">
              {playlist.tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-3 rounded-md hover:bg-white/10 transition-colors cursor-pointer group"
                  onClick={() => onTrackSelect(index)}
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
      </div>
    </div>
  );
};

export default PlaylistDropdown;
import React from 'react';
import { X, Music } from 'lucide-react';
import type { PlaylistTrack } from '../../types';

interface TracklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: PlaylistTrack[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

const TracklistModal: React.FC<TracklistModalProps> = ({
  isOpen,
  onClose,
  tracks,
  currentTrackIndex,
  onTrackSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-40 flex items-end justify-center transition-opacity duration-500 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className="bg-gluon-grey/80 backdrop-blur-xl text-white w-full max-w-lg rounded-t-3xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="text-lg font-bold">Up Next</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <X size={24} />
          </button>
        </div>
        <ul className="p-2 max-h-[50vh] overflow-y-auto">
          {tracks.map((track, index) => (
            <li
              key={track.id}
              onClick={() => onTrackSelect(index)}
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
                index === currentTrackIndex
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="w-8 text-center">
                {index === currentTrackIndex ? (
                  <Music size={20} className="text-green-400 animate-pulse" />
                ) : (
                  <span className="text-gray-400">{index + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${index === currentTrackIndex ? 'text-green-400' : ''}`}>
                  {track.title}
                </p>
                <p className="text-sm text-gray-300">{track.artist}</p>
              </div>
              <span className="text-sm text-gray-400">{track.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TracklistModal;
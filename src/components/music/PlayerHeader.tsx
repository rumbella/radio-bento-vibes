import React from 'react';
import { ListMusic } from 'lucide-react';

interface PlayerHeaderProps {
  playlistName: string;
  onPlaylistClick: () => void;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ playlistName, onPlaylistClick }) => {
  return (
    <div className="flex items-center justify-between w-full text-white p-4">
      <h2 className="text-lg font-bold">{playlistName}</h2>
      <button
        onClick={onPlaylistClick}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <ListMusic size={18} />
        <span>Playlist</span>
      </button>
    </div>
  );
};

export default PlayerHeader;
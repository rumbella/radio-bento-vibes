import React from 'react';
import { ListMusic, Share } from 'lucide-react';

interface PlayerHeaderProps {
  onPlaylistClick?: () => void;
}

const PlayerHeader: React.FC<PlayerHeaderProps> = ({ onPlaylistClick }) => {
  return (
    <div className="flex items-center justify-between w-full text-white p-4">
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 rounded-full transition-colors">
        <Share size={18} />
      </button>
      {onPlaylistClick && (
        <button
          onClick={onPlaylistClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <ListMusic size={18} />
          <span>Playlist</span>
        </button>
      )}
    </div>
  );
};

export default PlayerHeader;
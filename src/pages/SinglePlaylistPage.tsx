import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Play } from 'lucide-react';
import NewRadioPlayer from '../components/NewRadioPlayer';
import { useUIState } from '../contexts/UIContext';
import { usePlayerActions } from '../contexts/PlayerContext';

const SinglePlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playlists, isLoading, error } = useUIState();
  const { playPlaylistTrack } = usePlayerActions();

  if (isLoading) {
    return <div className="content-container"><div className="spinner"></div></div>;
  }

  if (error) {
    return <div className="content-container text-center p-4"><p>{error}</p></div>;
  }

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

  const handleTrackClick = (trackIndex: number) => {
    if (playlist) {
      const trackToPlay = {
        ...playlist.tracks[trackIndex],
        imageUrl: playlist.image,
      };
      const fullPlaylist = playlist.tracks.map(t => ({
        ...t,
        imageUrl: playlist.image,
      }));
      playPlaylistTrack(trackToPlay, fullPlaylist, trackIndex);
    }
  };

  const handlePlayAll = () => {
    if (playlist && playlist.tracks.length > 0) {
      handleTrackClick(0);
    }
  };

  const renderTracklist = () => (
    <div className="flex flex-col text-white h-full overflow-y-auto bg-[#1b1b1e] rounded-3xl">
      <div className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center text-gray-400 uppercase text-sm border-b border-gray-700 pb-2 sticky top-0 bg-[#1b1b1e] px-4 py-2">
        <span>#</span>
        <span>Title</span>
        <span>Artist</span>
        <Clock size={16} />
      </div>
      <div className="p-2">
        {playlist.tracks.map((track, index) => (
          <div
            key={track.id}
            className="grid grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => handleTrackClick(index)}
          >
            <span className="text-gray-400">{index + 1}</span>
            <span className="font-medium">{track.title}</span>
            <span className="text-gray-400">{track.artist}</span>
            <span className="text-gray-400">{track.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlaylistInfo = () => (
    <div className="text-white h-full p-6 bg-[#1b1b1e] rounded-3xl shadow-2xl overflow-y-auto">
      <img src={playlist.image} alt={playlist.name} className="w-full h-auto object-cover rounded-lg shadow-lg mb-4" />
      <h1 className="text-3xl font-semibold">{playlist.name}</h1>
      <p className="text-gray-400 mt-2">{playlist.description}</p>
      <div className="flex items-center space-x-4 text-gray-400 text-sm mt-4">
        <span>{playlist.tracks.length} tracks</span>
        <span>•</span>
        <span>{getTotalDuration(playlist.tracks)}</span>
      </div>
      <button
        className="mt-6 w-full bg-liquid-lava text-white py-3 rounded-full flex items-center justify-center gap-2 font-bold transition-transform hover:scale-105"
        onClick={handlePlayAll}
      >
        <Play size={20} className="fill-white" />
        Play All
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-[calc(100vh-12rem)] p-4 gap-4 bg-[#151419]">
        <div className="w-full h-[60%] rounded-lg overflow-hidden rounded-3xl shadow-2xl">
          {renderTracklist()}
        </div>
        <div className="flex-grow">
          <NewRadioPlayer />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-[calc(100vh-8rem)] px-8 bg-[#151419] gap-4 py-4">
        {/* Left Sidebar: Playlist Info */}
        <div className="w-[25%] h-full">
          {renderPlaylistInfo()}
        </div>

        {/* Main Content: Tracklist */}
        <div className="w-[45%] h-full">
          {renderTracklist()}
        </div>

        {/* Right Column: Player */}
        <div className="w-[30%] h-full">
          <NewRadioPlayer />
        </div>
      </div>
    </>
  );
};

export default SinglePlaylistPage;
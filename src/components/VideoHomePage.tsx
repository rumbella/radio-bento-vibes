import React from 'react';
import RadioPlayer from './RadioPlayer';

const VideoHomePage: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/thinkdigital/video/upload/v1751534019/videoplayback_rm5v5m.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md mx-auto">
          <RadioPlayer />
        </div>
      </div>
    </div>
  );
};

export default VideoHomePage;

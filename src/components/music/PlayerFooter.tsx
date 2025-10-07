import React from 'react';
import './PlayerFooter.css'; // We will create this file for the animation

interface PlayerFooterProps {
  tickerText: string;
}

const PlayerFooter: React.FC<PlayerFooterProps> = ({ tickerText }) => {
  return (
    <div className="w-full bg-black/20 backdrop-blur-sm text-white overflow-hidden whitespace-nowrap h-10 flex items-center">
      <div className="ticker-wrap">
        <div className="ticker-move">
          <div className="ticker-item">{tickerText}</div>
          <div className="ticker-item">{tickerText}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerFooter;
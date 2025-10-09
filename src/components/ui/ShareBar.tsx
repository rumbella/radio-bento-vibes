import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import RotatingText from './RotatingText';

interface ShareBarProps {}

const ShareBar: React.FC<ShareBarProps> = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 25000); // 25 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`bg-gluon-grey/20 backdrop-blur-md text-white rounded-3xl w-full h-10 flex items-center justify-between px-4 text-sm transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center gap-2">
        <span>share the experience</span>
       
      </div>
      <Share2 size={20} />
    </div>
  );
};

export default ShareBar;

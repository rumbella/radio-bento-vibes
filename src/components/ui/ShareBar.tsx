import React from 'react';
import { Share2 } from 'lucide-react';
import RotatingText from './RotatingText';

interface ShareBarProps {
  sponsorName: string;
}

const ShareBar: React.FC<ShareBarProps> = ({ sponsorName }) => {
  return (
    <div className="bg-gluon-grey/20 backdrop-blur-md text-white rounded-3xl w-full h-10 flex items-center justify-between px-4 text-sm">
      <div className="flex items-center gap-2">
        <span>share the experience</span>
        <RotatingText text1="powered by" text2={sponsorName} />
      </div>
      <Share2 size={20} />
    </div>
  );
};

export default ShareBar;
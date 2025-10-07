import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import RotatingText from './RotatingText';

interface DetailNavProps {
  sponsorName: string;
}

const DetailNav: React.FC<DetailNavProps> = ({ sponsorName }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex items-center justify-center text-white p-4 absolute top-0 left-0 z-20">
      <button onClick={() => navigate(-1)} className="absolute left-4 p-2 rounded-full hover:bg-white/10">
        <ChevronLeft size={28} />
      </button>
      <div className="font-semibold">
        <RotatingText text1="powered by" text2={sponsorName} />
      </div>
    </div>
  );
};

export default DetailNav;
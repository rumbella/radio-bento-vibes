import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface DetailNavProps {
  title: string;
}

const DetailNav: React.FC<DetailNavProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex items-center justify-start text-white p-4 absolute top-0 left-0 z-20">
      <button onClick={() => navigate(-1)} className="absolute left-4 p-2 rounded-full bg-black/20 backdrop-blur-md border-none flex items-center">
        <ChevronLeft size={28} />
        <span className="ml-2">back</span>
      </button>
      <div className="font-semibold ml-32">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default DetailNav;
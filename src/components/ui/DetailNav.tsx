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
      <div onClick={() => navigate(-1)} className="absolute left-4 flex items-center space-x-2 cursor-pointer">
        <div className="p-2 rounded-full bg-black/20 backdrop-blur-md border-none">
          <ChevronLeft size={28} />
        </div>
        <div className="p-2 rounded-full bg-black/20 backdrop-blur-md border-none">
          <span className="px-2">back</span>
        </div>
      </div>
      <div className="font-semibold ml-48">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default DetailNav;
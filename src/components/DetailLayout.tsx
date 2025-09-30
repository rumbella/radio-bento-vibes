import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface DetailLayoutProps {
  children: React.ReactNode;
  to: string;
}

const DetailLayout: React.FC<DetailLayoutProps> = ({ children, to }) => {
  return (
    <div className="page-container">
      <div className="absolute top-4 left-4 z-10">
        <Link to={to} className="flex items-center space-x-2" aria-label="Go back">
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-full">
            <ArrowLeft size={24} className="text-white" />
          </div>
          <div className="bg-white/10 backdrop-blur-md py-2 px-4 rounded-full">
            <span className="text-white">Back</span>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DetailLayout;
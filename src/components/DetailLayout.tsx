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
        <Link to={to} className="text-white flex items-center space-x-2" aria-label="Go back">
          <ArrowLeft size={24} />
          <span>Back</span>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default DetailLayout;